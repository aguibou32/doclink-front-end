import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  Card,
  Layout,
  Typography,
  Form,
  Flex,
  Dropdown,
  Space,
  message
} from "antd"

import { DownOutlined } from '@ant-design/icons'

import SubmitButton from "../components/customs/buttons/SubmitButton"
import OTPInput from "../components/customs/inputs/OTPInput"
import AlertComponent from "../components/customs/Alert"

import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
import getDeviceId from "../utils/deviceId"

import {
  useVerifyEmailMutation,
  useResendVerificationEmailMutation
} from "../slices/userVerificatonApiSlice"

import { login as setCredentials } from '../slices/authSlice'
import { validateVerificationCode } from "../utils/formValidation"

import useCooldown from "../utils/useCooldown"

const { Content } = Layout
const { Text, Title } = Typography

function VerifyEmail() {

  const [verifyEmail, { isLoading: isVerifyingEmail }] = useVerifyEmailMutation()
  const [resendVerificationEmail, { isLoading: isResendingCodeToEmail }] = useResendVerificationEmailMutation()
  const { t } = useTranslation()

  const [form] = Form.useForm()
  const [clientReady, setClientReady] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)

  const encodedEmail = queryParams.get('email')
  const encodedPhone = queryParams.get('phone')

  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null
  const phone = encodedPhone ? decodeURIComponent(encodedPhone) : null

  const { userInfo } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [alert, setAlert] = useState({
    type: '',
    message: ''
  })

  const { isCooldownActive, countdown, startCooldown } = useCooldown(60)

  const handleFormChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0)

    const isFieldTouched = form.isFieldsTouched('verificationCode')

    setIsFormValid(isFieldTouched && !hasErrors)
  }

  const handleResendVerificationCodeToEmail = async () => {
    setAlert({ type: '', message: '' })

    try {
      const response = await resendVerificationEmail({ email: email }).unwrap()
      console.log(response.message)
      setAlert({
        type: 'success',
        message: response.message
      })
      startCooldown()
    } catch (error) {
      setAlert({
        type: 'error',
        message: error?.data?.message || error?.message
      })
    }
  }

  const onFinish = async (values) => {
    setAlert({ type: '', message: '' })

    const deviceId = await getDeviceId()
    const deviceName = navigator.userAgent
    const verificationCode = values.verificationCode

    const data = {
      email: email,
      verificationCode,
      deviceId,
      deviceName
    }

    try {
      const response = await verifyEmail(data).unwrap()

      dispatch(setCredentials({ ...response }))
      navigate('/')
      message.success(response.message)

    } catch (error) {
      setAlert({
        type: 'error',
        message: error?.data?.message || error?.message
      })
    }
  }

  useEffect(() => {
    setClientReady(true)
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    if (!email || !isValidEmail(email)) {
      navigate('/register')
    }

    if (userInfo) {
      navigate('/')
    }

  }, [email, navigate, userInfo])

  return (
    <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
      <Card>
        <Flex justify="center" align="center" vertical>
          <Title level={5}>{t('verifyEmail')}</Title>
          <Text className="text-center">{t('enterCodeSentToEmail')} <strong>{email}</strong></Text>
        </Flex>
      </Card>

      <Card>
        <div className="mb-4">
          {alert.message && <AlertComponent type={alert.type} message={alert.message} />}
        </div>
        <Form
          disabled={isVerifyingEmail || isResendingCodeToEmail}
          form={form}
          name="verifyEmail"
          initialValues={{ verificationCode: '' }}
          onFinish={onFinish}
          onFieldsChange={handleFormChange}
          layout="vertical"
        >
          <Flex vertical gap={12}>
            <OTPInput
              name="verificationCode"
              label={t('verificationCode')}
              rules={[{ required: true, message: t('codeRequired') }, validateVerificationCode(t)]}
            />
            <SubmitButton
              isDisabled={!clientReady || !isFormValid || isVerifyingEmail}
              isSubmitting={isVerifyingEmail}
            />
            <Space className="flex justify-between">
              <Text>{t('problem')}</Text>

              <Dropdown.Button
                type="" size="small" loading={isResendingCodeToEmail}
                disabled={isResendingCodeToEmail || isCooldownActive}
                icon={<DownOutlined />}
                menu={{
                  items: [
                    {
                      label: (
                        <a onClick={handleResendVerificationCodeToEmail}>
                          <Flex gap={14}>
                            <EnvelopeIcon width={18} />
                            <Text>{email}</Text>
                          </Flex>
                        </a>
                      ),
                      key: 0
                    },
                    phone && (
                      {
                        type: 'divider',
                      },
                      {
                        label: (
                          <a onClick={handleResendVerificationCodeToEmail}>
                            <Flex gap={14}>
                              <PhoneIcon width={18} />
                              <Text>{phone}</Text>
                            </Flex>
                          </a>
                        ),
                        key: 1
                      }
                    )
                  ]
                }}
              >
                {
                  isResendingCodeToEmail
                    ? t('resendingCode')
                    : isCooldownActive
                      ? `${t('resendCodeIn')} ${countdown}`
                      : t('resendCode')
                }
              </Dropdown.Button>
            </Space>
          </Flex>
        </Form>
      </Card>
    </Content>
  )
}
export default VerifyEmail
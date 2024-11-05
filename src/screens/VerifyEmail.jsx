import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  Card,
  Layout,
  Typography,
  Form,
  Flex,
  message
} from "antd"
import SubmitButton from "../components/customs/buttons/SubmitButton"
import OTPInput from "../components/customs/inputs/OTPInput"
import AlertComponent from "../components/customs/Alert"

import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  useVerifyEmailMutation,
  useResendVerificationEmailMutation
} from "../slices/userVerificatonApiSlice"

import { login as setCredentials } from '../slices/authSlice'
import LinkButton from "../components/customs/buttons/LinkButton"
import { validateVerificationCode } from "../utils/formValidation"

const { Content } = Layout
const { Text } = Typography

function VerifyEmail() {

  const [verifyEmail, { isLoading: isVerifyingEmail }] = useVerifyEmailMutation()
  const [resendVerificationEmail, { isLoading: isResending }] = useResendVerificationEmailMutation()

  const { t } = useTranslation()

  const [form] = Form.useForm()
  const [clientReady, setClientReady] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const encodedEmail = queryParams.get('email')
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null
  const { userInfo } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [alert, setAlert] = useState({
    type: '',
    message: ''
  })

  const handleFormChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0)

    const isFieldTouched = form.isFieldsTouched('verificationCode')

    setIsFormValid(isFieldTouched && !hasErrors)
  }

  const handleResend = async () => {
    setAlert({type: '', message: ''})
    try {
      await resendVerificationEmail({ email: email }).unwrap()
    } catch (error) {
      console.log(error?.data?.message || error?.message)
      setAlert({
        type: 'error',
        message: error?.data?.message || error?.message
      })
    }
  }

  const onFinish = async (values) => {
    setAlert({ type: '', message: '' })

    const data = {
      email: email,
      verificationCode: values.verificationCode
    }

    try {
      await verifyEmail(data).unwrap()
      message.success(t('emailVerified'))
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
    <Content className="container mx-auto max-w-xs flex flex-col mt-24 space-y-4">
      <Card title={t('verifyEmail')}>
        <Flex vertical gap={12}>
          <Text className="text-center">{t('enterCodeSentToEmail')} <strong>{email}</strong></Text>
          {alert.message && <AlertComponent type="error" message={alert.message} />}
          <Form
            disabled={isVerifyingEmail || isResending}
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
              <div className="flex justify-between items-center">
                <Text>{t('problem')}</Text>
                <LinkButton
                  isLoading={isResending}
                  handleClick={handleResend}
                  text={t('resendCode')}
                />
              </div>
            </Flex>
          </Form>
        </Flex>
      </Card>
    </Content>
  )
}
export default VerifyEmail
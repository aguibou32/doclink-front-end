import { useEffect, useState } from "react"
import moment from "moment"

import {
  Layout,
  Form,
  Card,
  Typography,
  Steps,
  Flex,
} from "antd"
import { useTranslation } from "react-i18next"

import {
  EnvelopeIcon,
  IdentificationIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline"

import { Link } from "react-router-dom"

import FilledButton from "../components/customs/buttons/FilledButton"
import SubmitButton from "../components/customs/buttons/SubmitButton"
import SolidButton from "../components/customs/buttons/SolidButton"
import LinkButton from "../components/customs/buttons/LinkButton"
import TextInput from "../components/customs/inputs/TextInput"
import PasswordInput from "../components/customs/inputs/PasswordInput"
import CheckboxInput from "../components/customs/inputs/CheckboxInput"
import AlertComponent from "../components/customs/Alert"

import {
  validateName,
  validateSurname,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from "../utils/formValidation"

import {
  useCheckEmailInUseMutation,
  useRegisterMutation
} from "../slices/usersApiSlice"

import GenderInput from "../components/customs/inputs/GenderInput"
import DOBInput from "../components/customs/inputs/DOBInput"
import TermsAndConditionsModal from "../components/customs/TermsAndConditionsModal"
import PhoneInputComponent from "../components/customs/inputs/PhoneInputComponent"

import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const { Content } = Layout
const { Text, Title } = Typography

const Register = () => {

  const { t } = useTranslation()

  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || '/'

  const { userInfo } = useSelector(state => state.auth)

  const [current, setCurrent] = useState(0)
  const [clientReady, setClientReady] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [form] = Form.useForm()

  const [checkEmailInUse, { isLoading: isCheckingEmailInUse }] = useCheckEmailInUseMutation()
  const [register, { isLoading: isRegisteringUser }] = useRegisterMutation()

  const [alert, setAlert] = useState({ type: '', message: '' })
  const [isTermsModalIsOpen, setIsTermsModalIsOpen] = useState(false)

  const handleNext = async () => {
    try {
      const stepFields = getCurrentStepFields()
      await form.validateFields(stepFields) // Validate fields for the current step

      // Only perform email check if "email" is in stepFields
      if (stepFields.includes('email')) {
        const email = form.getFieldValue('email')
        try {
          await checkEmailInUse({ email }).unwrap()
          form.setFields([{ name: 'email', errors: [] }])
        } catch (error) {
          form.setFields([
            {
              name: 'email',
              errors: [t("emailInUseError")],
            },
          ])
          return
        }
      }
      setCurrent((prev) => prev + 1)
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }

  const handlePrevious = () => setCurrent((prev) => prev - 1)

  const onFinish = async (values) => {
    setAlert({ type: '', message: '' })

    const formattedDOB = moment(values.dob).format('YYYY-MM-DD')

    const user = {
      name: values.name,
      surname: values.surname,
      gender: values.gender,
      dob: formattedDOB,
      email: values.email,
      phone: values.phone,
      password: values.password,
      terms: values.termsOfUse
    }

    try {
      const response = await register(user).unwrap()

      const tempUserEmail = response.email
      const encodedEmail = encodeURIComponent(tempUserEmail)

      navigate(`/verify-email?email=${encodedEmail}`)

    } catch (error) {
      setAlert({
        type: 'error',
        message: error?.data?.message || error?.message
      })
    }
  }

  const handleFormChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0)

    const allTouched = form.isFieldsTouched(true)
    const termsOfConditionsAccepted = form.getFieldValue('termsOfUse')
    setIsFormValid(allTouched && !hasErrors && termsOfConditionsAccepted)
  }

  const getCurrentStepFields = () => {
    if (current === 0) return ["email"]
    if (current === 1) return ["gender", "dob", "name", "surname"]
    if (current === 2) return ["password", "confirmPassword"]
    return []
  }

  const steps = [
    {
      title: t("Email"),
      content: (
        <TextInput
          name="email"
          label={t("emailLabel")}
          rules={[
            { required: true, message: t("emailRequired") },
            { type: "email", message: t("validEmail") },
          ]}
          prefix={<EnvelopeIcon width={18} />}
          type="email"
          placeholder={t("emailPlaceholder")}
        />
      ),
    },
    {
      title: t("personalDetails"),
      content: (
        <Flex vertical gap={14}>
          <GenderInput
            rules={[{ required: true, message: t("genderRequired") }]}
          />
          <DOBInput
            rules={[{ required: true, message: t("dobRequired") }]}
          />
          <TextInput
            name="name"
            label={t("nameLabel")}
            rules={[{ required: true, message: t('nameRequired') }, validateName(t)]}
            prefix={<IdentificationIcon width={18} />}
            placeholder={t("namePlaceholder")}
          />
          <TextInput
            name="surname"
            label={t("surnameLabel")}
            rules={[{ required: true, message: t('surnameRequired') }, validateSurname(t)]}
            prefix={<IdentificationIcon width={18} />}
            placeholder={t("surnamePlaceholder")}
          />
        </Flex>
      ),
    },
    {
      title: t("passwordLabel"),
      content: (
        <Flex vertical gap={14}>
          <PhoneInputComponent
            name='phone'
            label={t('phoneNumber')}
            rules={[{ required: true, message: t("phoneNumberRequired") }, validatePhoneNumber(t)]}
            value={form.getFieldValue('phone')}
            onChange={(phone) => form.setFieldsValue({ phone })}
            isDisabled={isRegisteringUser}
          />
          <PasswordInput
            name="password"
            label={t("passwordLabel")}
            rules={[
              { required: true, message: t("passwordRequired") },
              validatePassword(t)]}
            prefix={<LockClosedIcon width={18} />}
            type="password"
            placeholder={t("passwordPlaceholder")}
          />
          <PasswordInput
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            rules={[
              { required: true, message: t("confirmPasswordRequired") },
              validateConfirmPassword(form.getFieldValue, t),
            ]}
            prefix={<LockClosedIcon width={18} />}
            type="password"
            placeholder={t("passwordPlaceholder")}
          />
          <Flex vertical gap={8}>
            <Text className="text-sm font-light">
              {t('termsAndConditionsPrompt')}
            </Text>
            <Flex justify="start" align="baseline">
              <CheckboxInput
                name="termsOfUse"
                rules={[{ required: true, message: t("termsAcceptance") }]}
              />
              <Text className="text-sm font-medium">
                {t("agreeToTerms")}{" "}
                <Link to="/terms" className="text-sky-600 hover:underline">
                  {t("termsAndConditions")}
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ),
    },
  ]

  const items = steps.map((item, index) => ({
    key: index,
    title: item.title,
  }))

  useEffect(() => {
    setClientReady(true)

    if (userInfo) {
      navigate(redirect)
    }

  }, [userInfo, redirect, navigate])

  return (
    <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
      <Card>
        <Typography>
          <div className="flex justify-between">
            <Title level={5}>{t("alreadyHaveAnAccount")}</Title>
            <Text>
              <Link to="/login">{t("login")}</Link>
            </Text>
          </div>
        </Typography>
      </Card>

      <Card>
        <Form
          disabled={isCheckingEmailInUse || isRegisteringUser}
          name="register"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFieldsChange={handleFormChange}
          scrollToFirstError
          initialValues={{
            email: "",
            gender: "",
            name: "",
            surname: "",
            dob: "",
            phone: "",
            password: "",
            confirmPassword: "",
            termsOfUse: false
          }}
        >
          <Steps
            current={current}
            items={items}
            size="small"
            labelPlacement="vertical"
            className="mb-6"
          />

          {alert.message && <AlertComponent type={alert.type} message={alert.message} />}

          <div className="md:mt-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={` ${current === index ? 'block' : 'hidden'} `}
              >
                {step.content}
              </div>
            ))}
          </div>

          <Flex justify="between" className="mt-8">
            <div className="flex-1">
              {current > 0 && (
                <FilledButton
                  handleClick={handlePrevious}
                  isDisabled={isRegisteringUser}
                  text={t("previous")} />
              )}
            </div>
            <div>
              {current < steps.length - 1 && (
                <SolidButton
                  handleClick={handleNext}
                  isDisabled={!clientReady || isCheckingEmailInUse}
                  text={t("next")}
                />
              )}
            </div>
            <div>
              {current === steps.length - 1 && (
                <SubmitButton
                  isDisabled={
                    !clientReady ||
                    !isFormValid ||
                    isRegisteringUser
                  }
                  isSubmitting={isRegisteringUser}
                />
              )}
            </div>
          </Flex>
        </Form>
      </Card>
      {
        isTermsModalIsOpen &&
        (<TermsAndConditionsModal
          isOpen={isTermsModalIsOpen}
          handleClose={() => setIsTermsModalIsOpen(false)}
        />)
      }
    </Content>
  )
}
export default Register
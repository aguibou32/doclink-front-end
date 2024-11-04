import { useEffect, useState } from "react"
import {
  Layout,
  Form,
  Card,
  Typography,
  message,
  Steps,
  Flex,
  Radio
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
import TextInput from "../components/customs/inputs/TextInput"
import PasswordInput from "../components/customs/inputs/PasswordInput"
import CheckboxInput from "../components/customs/inputs/CheckboxInput"
import AlertComponent from "../components/customs/Alert"

import {
  validateName,
  validateSurname,
  validatePassword,
  validateConfirmPassword,
} from "../utils/formValidation"

import {
  useCheckEmailInUseMutation,

} from "../slices/usersApiSlice"
import GenderInput from "../components/customs/inputs/GenderInput"

const { Content } = Layout
const { Text, Title } = Typography

const Register = () => {

  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [clientReady, setClientReady] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [form] = Form.useForm()

  const [checkEmailInUse, { isLoading: isCheckingEmailInUse }] = useCheckEmailInUseMutation()

  const [alert, setAlert] = useState({ type: '', message: '' })

  const handleNext = async () => {

    try {
      const stepFields = getCurrentStepFields()
      await form.validateFields(stepFields)

      if (stepFields.includes('email')) {
        const email = form.getFieldValue('email')
        try {
          await checkEmailInUse({ email }).unwrap()
          form.setFields([{ name: 'email', errors: [] }])
          setCurrent((prev) => prev + 1)
        } catch (error) {
          form.setFields([
            {
              name: 'email',
              errors: [t("emailInUseError")],
            },
          ])
        }
      }
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }

  const prev = () => setCurrent((prev) => prev - 1)

  const onFinish = async (values) => {
    console.log("Received values:", values)
    // console.log(response)
    message.success("Registration successful!")
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
    if (current === 1) return ["name", "surname"]
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
        <>
          <PasswordInput
            name="password"
            label={t("passwordLabel")}
            rules={[{ required: true, message: t("passwordRequired") }, validatePassword(t)]}
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
          <Flex justify="start" align="baseline" >
            <CheckboxInput
              name="termsOfUse"
              rules={[{ required: true, message: t('termsOfUseRequired') }]}
            />
            <Link to='/'>{t('termsOfUse')}</Link>
          </Flex>
        </>
      ),
    },
  ]

  const items = steps.map((item, index) => ({
    key: index,
    title: item.title,
  }))

  useEffect(() => {
    setClientReady(true)
  }, [])

  return (
    <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4 md:max-w-lg">
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
          disabled={isCheckingEmailInUse}
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

          <div className="flex flex-row justify-between mt-8">
            <div className="flex-1">
              {current > 0 && (
                <FilledButton handleClick={prev} text={t("previous")} />
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
                    !clientReady || !isFormValid}
                  isSubmitting={false}
                />
              )}
            </div>
          </div>
        </Form>
      </Card>
    </Content>
  )
}
export default Register
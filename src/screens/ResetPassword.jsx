import { useEffect, useState } from "react"

import {
    Layout,
    Form,
    Flex,
    Card,
    Typography,
    message,
} from "antd"

import AlertComponent from "../components/customs/Alert"
import SubmitButton from '../components/customs/buttons/SubmitButton'
import PasswordInput from "../components/customs/inputs/PasswordInput"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { validatePassword, validateConfirmPassword } from "../utils/formValidation"

import { useTranslation } from "react-i18next"
import {
    useNavigate,
    useParams
} from "react-router-dom"

import { useResetPasswordMutation } from "../slices/usersApiSlice"

const { Content } = Layout
const { Text, Title } = Typography



const ResetPassword = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation()

    const { token } = useParams()

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    })

    const [form] = Form.useForm()
    const [clientReady, setClientReady] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const onFinish = async values => {
        setAlert({
            type: '',
            message: ''
        })

        const { password } = values

        try {
            const response = await resetPassword({
                newPassword: password,
                token
            }).unwrap()
            navigate('/login')
            message.success(response.message)
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
        setIsFormValid(allTouched && !hasErrors)
    }

    useEffect(() => {
        setClientReady(true)
    }, [])

    return (
        <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
            <Card>
                <Flex justify="center" align="center" vertical>
                    <Title level={5}>{t('resetYourPassword')}</Title>
                    <Text className="text-center">{t('resetPasswordPromptSecond')}</Text>
                </Flex>
            </Card>
            <Card>
                <div className="mb-4">
                    {alert.message && <AlertComponent type={alert.type} message={alert.message} />}
                </div>
                <Form
                    disabled={isResettingPassword}
                    form={form}
                    name="login"
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    onFinish={onFinish}
                    onFieldsChange={handleFormChange}
                    layout="vertical"
                >
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
                    <SubmitButton
                        isDisabled={
                            !clientReady || 
                            !isFormValid ||
                            isResettingPassword
                        }
                        isSubmitting={isResettingPassword}
                    />
                </Form>
            </Card>
        </Content>
    )
}
export default ResetPassword
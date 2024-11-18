import {
    useEffect,
} from "react"

import {
    Layout,
    Form,
    Flex,
    Card,
    Typography,
    message
} from "antd"

import SubmitButton from '../components/customs/buttons/SubmitButton'
import TextInput from "../components/customs/inputs/TextInput"
import CheckBoxInput from "../components/customs/inputs/CheckboxInput"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import PasswordInput from "../components/customs/inputs/PasswordInput"
import AlertComponent from "../components/customs/Alert.jsx"

import { Link } from "react-router-dom"

import { useTranslation } from "react-i18next"

import { login as setCredentials } from "../slices/authSlice"

import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import getDeviceId from "../utils/deviceId"

import { useLoginMutation } from "../slices/usersApiSlice.js"
import { useState } from "react"
import LinkButton from "../components/customs/buttons/LinkButton"

const { Content } = Layout
const { Text, Title } = Typography

const Login = () => {

    const { t } = useTranslation()

    const [login, { isLoading: isLoginUser }] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"


    const [form] = Form.useForm()
    const [clientReady, setClientReady] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    })


    const handleFormChange = () => {
        const hasErrors = form
            .getFieldsError()
            .some(({ errors }) => errors.length > 0)

        const allTouched = form.isFieldsTouched(['email', 'password'], true)

        setIsFormValid(allTouched && !hasErrors)
    }

    const onFinish = async (values) => {
        setAlert({ type: '', message: '' })

        const { email, password, rememberMe } = values
        const deviceId = await getDeviceId()
        const deviceName = navigator.userAgent

        const data = {
            email,
            password,
            deviceId,
            deviceName,
            rememberMe
        }

        try {
            const response = await login(data).unwrap()
            if(response.isTwoFactorRequired){
                const userEmail = encodeURIComponent(response.email)
                const phoneNumber = encodeURIComponent(response.phone)
                navigate(`/verify-email?email=${userEmail}&phone=${phoneNumber}`)
            }else{
                dispatch(setCredentials({...response}))
                navigate('/')
                message.success(response.message)
            }
        } catch (error) {
            setAlert({ type: 'error', message: error?.data?.message || error?.message })
        }
    }

    useEffect(() => {
        setClientReady(true)
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    return (
        <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
            <Card>
                <Flex justify="space-between">
                    <Title level={5}>{t('newHere')}</Title>
                    <Text><Link to='/register'>{t('createAccount')}</Link></Text>
                </Flex>
            </Card>
            <Card>
                <div className="mb-4">
                    {alert.message && <AlertComponent type={alert.type} message={alert.message} />}
                </div>
                <Form
                    disabled={isLoginUser}
                    form={form}
                    name="login"
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: true,
                    }}
                    onFinish={onFinish}
                    onFieldsChange={handleFormChange}
                    layout="vertical"
                >
                    <Flex vertical gap={14}>
                        <TextInput
                            label={t('emailLabel')}
                            name='email'
                            rules={[
                                { required: true, message: t('emailRequired') },
                                { type: 'email', message: t('validEmail') }
                            ]}
                            prefix={<EnvelopeIcon width={18} />}
                            type='email'
                            placeholder={t('emailPlaceholder')}
                        />

                        <PasswordInput
                            label={t('passwordLabel')}
                            name='password'
                            rules={[{ required: true, message: t('inputPassword') }]}
                            prefix={<LockClosedIcon width={18} />}
                            type='password'
                            placeholder={t('passwordPlaceholder')}
                        />

                        <Flex justify="space-between" align="baseline">
                            <CheckBoxInput name='rememberMe' value="checked" text={t('rememberMe')} />
                            <Link to='/forgot-password'>
                                <LinkButton text={t('forgotPassword')} isDisabled={isLoginUser} />
                            </Link>
                        </Flex>
                        <SubmitButton
                            isDisabled={
                                !clientReady || 
                                !isFormValid ||
                                isLoginUser
                            }
                            isSubmitting={isLoginUser}
                        />
                    </Flex>
                </Form>
            </Card>
        </Content>
    )
}
export default Login


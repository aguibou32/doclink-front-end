import { useEffect, useState } from "react"

import {
    Layout,
    Form,
    Flex,
    Card,
    Typography,
} from "antd"

import SubmitButton from '../components/customs/buttons/SubmitButton'
import TextInput from "../components/customs/inputs/TextInput"
import CheckBoxInput from "../components/customs/inputs/CheckboxInput"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import PasswordInput from "../components/customs/inputs/PasswordInput"
import { Link } from "react-router-dom"

import { useTranslation } from "react-i18next"

const { Content } = Layout
const { Text, Title } = Typography


const Login = () => {

    const { t } = useTranslation()

    const [form] = Form.useForm()
    const [clientReady, setClientReady] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const onFinish = (values) => {
        console.log(`Received values: `, values)
    }

    const handleFormChange = () => {
        const hasErrors = form
            .getFieldsError()
            .some(({ errors }) => errors.length > 0);

        const allTouched = form.isFieldsTouched(['email', 'password'], true);

        setIsFormValid(allTouched && !hasErrors);
    }

    useEffect(() => {
        setClientReady(true)
    }, [])

    return (
        <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
            <Card>
                <Flex justify="space-between">
                    <Title level={5}>{t('newHere')}</Title>
                    <Text><Link to='/register'>{t('createAccount')}</Link></Text>
                </Flex>
            </Card>
            <Card>
                <Form
                    disabled={false}
                    form={form}
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFieldsChange={handleFormChange}
                    layout="vertical"
                >
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

                    <Flex justify="space-between" align="baseline" className="">
                        <CheckBoxInput name='remember' value="checked" text='remember me' />
                        <Link to='/'>
                            {t('forgotPassword')}
                        </Link>
                    </Flex>
                    <SubmitButton
                        isDisabled={!clientReady || !isFormValid}
                        isSubmitting={false}
                    />
                </Form>
            </Card>
        </Content>
    )
}
export default Login
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
import { EnvelopeIcon } from "@heroicons/react/24/outline"

import { useTranslation } from "react-i18next"

const { Content } = Layout
const { Text, Title } = Typography


const ForgotPassword = () => {

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
            .some(({ errors }) => errors.length > 0)

        const emailTouched = form.isFieldTouched('email')

        setIsFormValid(emailTouched && !hasErrors)
    }

    useEffect(() => {
        setClientReady(true)
    }, [])

    return (
        <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
            <Card>
                <Flex justify="center" align="center" vertical>
                    <Title level={5}>{t('forgotPasswordPrompt')}</Title>
                    <Text className="text-center">{t('resetPasswordPrompt')}</Text>
                </Flex>
            </Card>
            <Card>
                <Form
                    disabled={false}
                    form={form}
                    name="login"
                    initialValues={{
                        email: '',
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
                    <SubmitButton
                        isDisabled={!clientReady || !isFormValid}
                        isSubmitting={false}
                    />
                </Form>
            </Card>
        </Content>
    )
}
export default ForgotPassword
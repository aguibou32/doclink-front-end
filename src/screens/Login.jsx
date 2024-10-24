import { useEffect, useState } from "react"

import {
    Layout,
    Checkbox,
    Form,
    Flex,
} from "antd"

import SubmitButton from '../components/customs/buttons/SubmitButton'
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import TextInput from "../components/customs/inputs/TextInput"

const { Content } = Layout

const Login = () => {

    const [form] = Form.useForm()
    const [clientReady, setClientReady] = useState(false)

    const onFinish = (values) => {
        console.log(`Received values: `, values)
    }


    useEffect(() => {
        setClientReady(true)
    }, [])

    return (
        <Content className="h-screen flex justify-center items-center">
            <Form
                disabled={false}
                form={form}
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                layout="vertical"
            >
                <TextInput
                    name='email'
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                    ]}
                    prefix={<EnvelopeIcon width={18} />}
                    type='email'
                    placeholder='Email'
                />
                
                <TextInput
                    name='password'
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    prefix={<LockClosedIcon width={18} />}
                    type='password'
                    placeholder='Password'
                />

                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <SubmitButton
                            text='Submit'
                            isDisabled={
                                !clientReady ||
                                !form.isFieldsTouched(['email', 'password'], true) ||
                                !!form.getFieldsError(['email', 'password'], true).filter(({ errors }) => errors.length).length
                            }
                            isSubmitting={false} />)
                    }
                </Form.Item>
            </Form>
        </Content>
    )
}
export default Login
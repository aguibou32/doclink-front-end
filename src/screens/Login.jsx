
import {
    Layout,
    Checkbox,
    Form,
    Input,
    Flex

} from "antd"

import SubmitButton from '../components/customs/buttons/SubmitButton'
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline"

const { Content } = Layout

const Login = () => {

    const onFinish = (values) => {
        console.log(`Received values: `, values)
    }

    return (
        <Content className="h-screen flex justify-center items-center">
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserIcon width={12} />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input prefix={<LockClosedIcon width={12} />} type="password" placeholder="Password" />
                </Form.Item>


                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>


                <Form.Item>
                    <SubmitButton text='Submit' isSubmitting={true} />
      
                </Form.Item>


            </Form>
        </Content>
    )
}
export default Login
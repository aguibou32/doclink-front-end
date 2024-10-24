import { Form, Input } from 'antd'

const TextInput = ({ name, rules, prefix, type = 'text', placeholder }) => {
    return (
        <Form.Item
            name={name}
            rules={rules}
        >
            <Input 
                prefix={prefix} 
                type={type} 
                placeholder={placeholder} 
            />
        </Form.Item>
    )
}
export default TextInput
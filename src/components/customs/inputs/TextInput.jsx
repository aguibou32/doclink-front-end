import { Form, Input } from 'antd'

const TextInput = ({ name, rules, prefix, type = 'text', label, placeholder }) => {
  return (
    <Form.Item
      hasFeedback
      label={label}
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
import { Form, Input } from 'antd'

const PasswordInput = ({ name, rules, prefix, type = 'text', label, placeholder }) => {
  return (
    <Form.Item
      // hasFeedback
      label={label}
      name={name}
      rules={rules}
    >
      <Input.Password
        allowClear
        prefix={prefix}
        type={type}
        placeholder={placeholder}
      />
    </Form.Item>
  )
}
export default PasswordInput
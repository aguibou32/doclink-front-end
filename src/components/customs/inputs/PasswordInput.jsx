import { Form, Input } from "antd"

const PasswordInput = ({
  name,
  rules,
  prefix,
  type = "password",
  label,
  placeholder
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      <Input.Password
        prefix={prefix}
        type={type}
        placeholder={placeholder}
        className="text-base"
      />
    </Form.Item>
  )
}

export default PasswordInput

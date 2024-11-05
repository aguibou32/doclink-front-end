import { Form, Input } from "antd"

const TextInput = ({
  name,
  rules = [],
  prefix,
  type = "text",
  label,
  placeholder
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      // valuePropName="value" 
    >
      <Input
        prefix={prefix}
        type={type}
        placeholder={placeholder}
        className="text-base"
      />
    </Form.Item>
  )
}

export default TextInput

import { Form, Checkbox } from "antd";

const CheckboxInput = ({ 
  name, 
  rules = [], 
  label = '', 
  text = '' 
}) => {
  return (
    <Form.Item
      name={name}
      valuePropName="checked"
      rules={rules}
    >
      <Checkbox>{label || text}</Checkbox>
    </Form.Item>
  );
};

export default CheckboxInput;

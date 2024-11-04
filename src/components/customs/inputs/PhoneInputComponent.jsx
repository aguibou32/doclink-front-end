import 'react-phone-number-input/style.css'
import { Form } from "antd"
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from 'react-i18next'


const PhoneInputComponent = ({
  name,
  rules = [],
  label,
  value,
  onChange
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
    >
      <PhoneInput
        international
        defaultCountry="CA"
        placeholder={t('phonePlaceholder')}
        value={value}
        onChange={onChange}
        className="flex items-center px-2 py-1 rounded-md border border-gray"
      />
    </Form.Item>
  )
}

export default PhoneInputComponent

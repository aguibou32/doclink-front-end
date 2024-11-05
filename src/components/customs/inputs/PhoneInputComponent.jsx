import 'react-phone-number-input/style.css'
import { Form } from "antd"
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from 'react-i18next'

const PhoneInputComponent = ({
  name,
  rules = [],
  label,
  value,
  onChange,
  isDisabled = false
}) => {
  const { t } = useTranslation()

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <PhoneInput
        disabled={isDisabled}
        international
        defaultCountry="CA"
        placeholder={t('phonePlaceholder')}
        value={value}
        onChange={onChange}
        className={`flex items-center px-2 py-1 rounded-md border ${
          isDisabled ? 'text-gray-400 bg-gray-50 border-gray-200' : 'border-gray-300'
        }`}
      />
    </Form.Item>
  )
}
export default PhoneInputComponent
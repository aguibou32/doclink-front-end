import { Form, Input } from "antd"
import { useTranslation } from "react-i18next"
import { KeyIcon } from "@heroicons/react/24/outline"

function OTPInput({ name, rules = [], label}) {
  const { t } = useTranslation()

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
    >
      <Input
        prefix={<KeyIcon width={18} />}
        maxLength={6}
        autoFocus
        inputMode="number"
        placeholder={t('verificationCodePlaceholder')}
        className="text-center"
      />
    </Form.Item>
  )
}
export default OTPInput
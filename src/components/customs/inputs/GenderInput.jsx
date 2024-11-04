import { Form, Radio } from "antd"
import { useTranslation } from "react-i18next"

const GenderInput = ({ rules = [] }) => {
  const { t } = useTranslation()

  return (
    <Form.Item
      label={t("identity")}
      name="gender"
      rules={rules}
    >
      <Radio.Group size="large">
        <Radio value="male">{t("male")}</Radio>
        <Radio value="female">{t("female")}</Radio>
      </Radio.Group>
    </Form.Item>
  )
}
export default GenderInput
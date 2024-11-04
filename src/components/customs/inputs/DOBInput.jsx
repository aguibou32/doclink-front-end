import { Form, DatePicker } from "antd"
import { useTranslation } from "react-i18next"
import moment from "moment"

const DOBInput = ({ rules = [] }) => {

    const { t } = useTranslation()

    return (
        <Form.Item
            label={t("dobLabel")}
            name="dob"
            rules={rules}
        >
            <DatePicker
                className="w-full"
                placeholder={t("dobPlaceholder")}
                disabledDate={(current) => current && current > moment().endOf('day')}
                format={{
                    format: 'YYYY-MM-DD',
                    type: 'mask',
                }}
            />
        </Form.Item>
    )
}
export default DOBInput
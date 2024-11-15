import React from "react"
import { ConfigProvider } from "antd"
import { Form, DatePicker } from "antd"
import { useTranslation } from "react-i18next"
import moment from "moment"
import "moment/locale/fr"
import "moment/locale/en-gb"
import enUS from "antd/es/locale/en_US"
import frFR from "antd/es/locale/fr_FR"


moment.locale('fr')
console.log('test')
console.log(moment().format("MMMM"));

const DOBInput = ({ rules = [] }) => {
    const { t, i18n } = useTranslation()

    // Determine Ant Design and Moment locale dynamically
    const locale = i18n.language === "fr" ? frFR : enUS
    moment.locale(i18n.language)

    return (
        <ConfigProvider locale={locale}>
            <Form.Item
                label={t("dobLabel")}
                name="dob"
                rules={rules}
            >
                <DatePicker
                    className="w-full"
                    placeholder={t("dobPlaceholder")}
                    disabledDate={(current) => current && current > moment().endOf("day")}
                    format="YYYY-MM-DD"
                    locale={i18n.language === "fr" ? frFR : enUS}
                />
            </Form.Item>
        </ConfigProvider>
    )
}

export default DOBInput
import { Modal } from "antd"
import { useTranslation } from "react-i18next"

const TermsAndConditionsModal = ({ isOpen, handleClose }) => {
    const { t } = useTranslation()

    const handleCancel = () => handleClose()

    return (
        <Modal
            title={t("termsTitle")}
            open={isOpen}
            onCancel={handleCancel}
            maskClosable={false}
            centered
            className="max-w-lg"
            footer={null}
        >
            <div className="max-h-[60vh] overflow-y-auto">
                <h2>{t("termsIntro")}</h2>
                <p>{t("termsUsage")}</p>

                <h3>{t("dataPrivacyTitle")}</h3>
                <p>{t("dataPrivacyContent")}</p>

                <h3>{t("responsibilitiesTitle")}</h3>
                <p>{t("responsibilitiesContent")}</p>

                <h3>{t("limitationsTitle")}</h3>
                <p>{t("limitationsContent")}</p>

                <h3>{t("changesTitle")}</h3>
                <p>{t("changesContent")}</p>

                <h3>{t("contactTitle")}</h3>
                <p>{t("contactContent")}</p>
            </div>
        </Modal>
    )
}

export default TermsAndConditionsModal

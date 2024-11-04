import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const TermsAndConditionsModal = ({ isOpen, handleClose }) => {
    const { t } = useTranslation()

    const handleOk = () => handleClose()
    const handleCancel = () => handleClose()

    return (
        <Modal
            title={t("termsTitle")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            centered
            className="max-w-lg"
        >
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
        </Modal>
    );
};

export default TermsAndConditionsModal

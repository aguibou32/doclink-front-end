import { useState, useEffect } from "react"
import { Modal, Input, Typography, message, Dropdown, Menu, Form } from "antd"
import SubmitButton from "./customs/buttons/SubmitButton"
import { useTranslation } from "react-i18next"
import LinkButton from "./customs/buttons/LinkButton"

const { Text } = Typography

const VerificationCodeModal = ({ isOpen, handleClose }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [otpCode, setOtpCode] = useState("")
    const [resending, setResending] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

    // Watch for changes in otpCode to enable/disable submit button
    useEffect(() => {
        setIsSubmitDisabled(otpCode.length !== 6) // Enable if exactly 6 digits are entered
    }, [otpCode])

    const handleOtpChange = (value) => {
        setOtpCode(value.toUpperCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault() // Prevent page reload
        if (otpCode.length < 6) {
            message.error(t("enterValidCode")) // Display localized error message
            return
        }

        setLoading(true)
        // Simulate a submission (replace with real API call)
        setTimeout(() => {
            setLoading(false)
            message.success(t("verificationSuccess")) // Success message
            handleClose()
        }, 3000)
    }

    const handleResend = (method) => {
        setResending(true)
        message.info(t("resendMessage", { method })) // Display resend message
        setTimeout(() => {
            setResending(false)
            message.success(t("codeSent", { method }))
        }, 2000)
    }

    const resendMenu = (
        <Menu
            onClick={({ key }) => handleResend(key)}
            items={[
                { label: t("email"), key: "email" },
                { label: t("phoneNumber"), key: "phone number" },
            ]}
        />
    )

    return (
        <Modal
            open={isOpen}
            title={t("twoStepsVerification")}
            onCancel={handleClose}
            maskClosable={false}
            centered
            footer={null} // Footer moved inside the form
            className="max-w-xs md:max-w-sm"
        >
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mt-16 mb-8 space-y-4">
                    <Text level="4">{t("enterCode")}</Text>
                    <Input.OTP
                        value={otpCode}
                        onChange={handleOtpChange}
                        maxLength={6}
                        autoFocus
                        inputMode="numeric"
                        className="w-full flex justify-between gap-4"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <SubmitButton
                        isDisabled={isSubmitDisabled || loading}
                        isSubmitting={loading}
                        htmlType="submit"
                    >
                        {t("verify")}
                    </SubmitButton>
                    <div className="flex justify-center items-center gap-2">
                        <Text>{t("problem")}</Text>
                        <Dropdown menu={resendMenu} trigger={["click"]}>
                            <LinkButton
                                text={t("resendCode")}
                                isLoading={resending}
                                handleClick={handleResend}
                            />
                        </Dropdown>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default VerificationCodeModal

import { useState, useEffect } from "react"
import { Modal, Input, Typography, message, Dropdown, Form, Button } from "antd"
import SubmitButton from "./customs/buttons/SubmitButton"
import { useTranslation } from "react-i18next"

const { Text } = Typography

const VerificationCodeModal = ({ isOpen, handleClose }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [otpCode, setOtpCode] = useState("")
    const [resending, setResending] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

    useEffect(() => {
        setIsSubmitDisabled(otpCode.length !== 6)
    }, [otpCode])

    const handleOtpChange = (value) => {
        setOtpCode(value.toUpperCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (otpCode.length < 6) {
            message.error(t("enterValidCode"))
            return
        }

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            message.success(t("verificationSuccess"))
            handleClose()
        }, 3000)
    }

    const handleResend = (method) => {
        setResending(true)
        message.info(t("resendMessage", { method }))
        setTimeout(() => {
            setResending(false)
            message.success(t("codeSent", { method }))
        }, 2000)
    }



    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        }
    ]

    return (
        <Modal
            open={isOpen}
            title={t("twoStepsVerification")}
            onCancel={handleClose}
            maskClosable={false}
            centered
            footer={null}
            className="max-w-xs md:max-w-sm"
        >
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mt-16 mb-8 space-y-4">
                    <Text level="4">{t("enterCode")}</Text>
                    <Input.OTP
                        size="large"
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
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottom"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            {/* <LinkButton text="resend Code">asdfasdf</LinkButton> */}
                            <Button type="link">Resend Code</Button>
                        </Dropdown>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
export default VerificationCodeModal
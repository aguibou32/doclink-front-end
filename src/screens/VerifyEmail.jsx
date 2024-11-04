import { useState, useEffect } from "react"
import { Card, Layout, Input, Typography, message, Form } from "antd"
import SubmitButton from "../components/customs/buttons/SubmitButton"
import LinkButton from '../components/customs/buttons/LinkButton'
import { useTranslation } from "react-i18next"
import OTPInput from "../components/customs/inputs/OTPInput"

const { Content } = Layout
const { Text } = Typography

function VerifyEmail() {


  const { t } = useTranslation()

  
  const handleSubmit = () => {
    
  }

  return (
    <Content className="container mx-auto max-w-sm flex flex-col mt-24 space-y-4">
      <Card title="verify your email">
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mt-8 mb-8 space-y-4">
            <Text level="4">{t("enterCode")}</Text>
           <OTPInput />
          </div>
          <div className="flex flex-col gap-4">
            <SubmitButton
              isDisabled={false}
              isSubmitting={false}
              htmlType="submit"
            >
              {t("verify")}
            </SubmitButton>
            <div className="flex justify-center items-center gap-2">
              <Text>{t("problem")}</Text>
              <LinkButton text="Resend Code" isLoading={true}/>
            </div>
          </div>
        </Form>
      </Card>
    </Content>
  )
}

export default VerifyEmail
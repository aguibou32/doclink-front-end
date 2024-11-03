import Input from 'antd/es/input/Input'
import { useState } from 'react'

function OTPInput() {

  const [otpCode, setOTPCode] = useState()


  const handleOtpChange = (value) => {
    setOTPCode(value.toUpperCase())
  }

  return (
    <Input.OTP
      size="large"
      value={otpCode}
      onChange={handleOtpChange}
      maxLength={6}
      autoFocus
      inputMode="numeric"
      className="w-full flex justify-between gap-4"
    />
  )
}

export default OTPInput
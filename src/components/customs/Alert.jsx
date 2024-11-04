
import { Alert } from "antd"

function AlertComponent({message, type='success'}) {
  return (
    <Alert
      message={message}
      type={type}
      closable
      showIcon
    />
  )
}
export default AlertComponent
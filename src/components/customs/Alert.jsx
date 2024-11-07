
import { Alert } from "antd"

function AlertComponent({type = 'success', message }) {
  return (
    <Alert
      type={type}
      message={message}
      closable
      showIcon
    />
  )
}
export default AlertComponent
import React from 'react'
import { Button } from "antd"

const FilledButton = ({ icon = null, text = '', isDisabled = false, handleClick }) => {
  return (
    <Button
      type='default'
      color='default'
      variant='filled'
      icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
      onClick={handleClick}
      className="text-base font-bold"
      disabled={isDisabled}
    >
      {text}
    </Button>
  )
}

export default FilledButton
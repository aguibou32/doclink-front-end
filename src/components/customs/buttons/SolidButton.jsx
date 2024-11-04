
import React from 'react'
import { Button } from "antd"


const SolidButton = ({ icon = null, text = '', isDisabled, handleClick }) => {
    return (
        <Button
            type='primary'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
            onClick={handleClick}
            className="text-base font-bold"
            disabled={isDisabled}
            loading={isDisabled}
        >
            {text}
        </Button>
    )
}
export default SolidButton
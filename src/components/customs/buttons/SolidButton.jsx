
import React from 'react'
import { Button } from "antd"


const SolidButton = ({ icon = null, text = '' }) => {
    return (
        <Button
            type='primary'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
        >
            {text}
        </Button>
    )
}
export default SolidButton

import React from 'react'
import { Button } from "antd"


const OutlineButton = ({ icon = null, text = '' }) => {
    return (
        <Button
            type='default'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
        >
            {text}
        </Button>
    )
}
export default OutlineButton
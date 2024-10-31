
import React from 'react'
import { Button } from "antd"


const OutlineButton = ({ icon = null, text = '', handleClick }) => {
    return (
        <Button
            type='default'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
            onClick={handleClick}
            className="text-base font-bold"
        >
            {text}
        </Button>
    )
}
export default OutlineButton
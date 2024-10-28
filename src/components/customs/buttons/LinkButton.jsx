
import React from 'react'
import { Button } from "antd"


const LinkButton = ({ icon = null, text = '', handleClick }) => {
    return (
        <Button
            type='link'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
            onClick={handleClick}
            className="text-base font-bold"
        >
            {text}
        </Button>
    )
}
export default LinkButton 

import React from 'react'
import { Button } from "antd"


const LinkButton = ({ icon = null, text = '' }) => {
    return (
        <Button
            type='link'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }): null}
        >
            {text}
        </Button>
    )
}
export default LinkButton 
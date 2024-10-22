
import React from 'react'
import { Button } from "antd"


const FilledButton = ({ icon = null, text = '' }) => {
    return (
        <Button
            type='default'
            color='default'
            variant='filled'
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }) : null}
        >
            {text}
        </Button>
    )
}

export default FilledButton
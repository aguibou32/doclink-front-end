
import React from 'react'
import { Button } from "antd"

const SubmitButton = ({ icon = null , text = '', isSubmitting = false }) => {

    const placeholderIcon = <span className="h-5 w-5 invisible" />

    return (
        <Button
            type="primary"
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }): placeholderIcon}
            loading={isSubmitting}
            disabled={isSubmitting}
        >
            {text || 'Submit'}
        </Button>
    )
}
export default SubmitButton

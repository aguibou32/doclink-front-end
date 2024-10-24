
import React from 'react'
import { Button } from "antd"

const SubmitButton = ({ icon = null , text = '', isDisabled = false, isSubmitting = false }) => {

    const placeholderIcon = <span className="w-5 h-5 invisible" />

    return (
        <Button
            block
            type="primary"
            icon={icon ? React.cloneElement(icon, { className: 'h-5 w-5' }): placeholderIcon}
            loading={isSubmitting}
            disabled={isDisabled || isSubmitting}
            htmlType='submit'
        >
            {isSubmitting ? 'Submitting...': text || 'Submit'}
        </Button>
    )
}
export default SubmitButton

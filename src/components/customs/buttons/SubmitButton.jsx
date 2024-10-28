import React from 'react'
import { Form, Button } from 'antd'
import { useTranslation } from 'react-i18next'

const SubmitButton = ({
    icon = null,
    text = '',
    isDisabled = false,
    isSubmitting = false
}) => {
    const { t } = useTranslation()

    const placeholderIcon = <span className="w-5 h-5 invisible" />

    return (
        <Form.Item shouldUpdate>
            {
                () => (
                    <Button
                        block
                        type="primary"
                        icon={icon
                            ? React.cloneElement(icon, { className: 'h-5 w-5' })
                            : placeholderIcon
                        }
                        loading={isSubmitting}
                        disabled={isDisabled || isSubmitting}
                        htmlType="submit"
                        className="text-base font-bold"
                    >
                        {isSubmitting ? t('submitting') : text || t('submit')}
                    </Button>
                )
            }
        </Form.Item>
    )
}
export default SubmitButton

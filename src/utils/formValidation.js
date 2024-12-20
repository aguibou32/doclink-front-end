import { isValidPhoneNumber } from "react-phone-number-input"

export const validateName = (t) => ({
  validator(_, value) {
    // Trim any leading and trailing spaces
    const trimmedValue = value?.trim()

    // Allow only letters and single spaces between words
    const pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/

    if (!trimmedValue || pattern.test(trimmedValue)) {
      return Promise.resolve()
    }

    return Promise.reject(new Error(t("nameInvalid")))
  },
})

export const validateSurname = (t) => ({
  validator(_, value) {
    // Trim any leading and trailing spaces
    const trimmedValue = value?.trim()

    // Allow only letters and single spaces between words
    const pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/

    if (!trimmedValue || pattern.test(trimmedValue)) {
      return Promise.resolve()
    }

    return Promise.reject(new Error(t("surnameInvalid")))
  },
})

export const validatePassword = (t) => ({
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  validator(_, value) {
    if (!value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(t("invalidPassword")));
  },
})

export const validateConfirmPassword = (getFieldValue, t) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(t("passwordsDoNotMatch")))
  },
})


export const validatePhoneNumber = (t) => ({
  validator: (_, value) => {
    if (value && !isValidPhoneNumber(value)) {
      return Promise.reject(new Error(t('invalidPhoneNumber')));
    }
    return Promise.resolve();
  }
})

export const validateVerificationCode = (t) => ({
  validator: (_, value) => {
    if (value) {
      const sanitizedInput = value ? value.replace(/[^0-9]/g, '') : '';

      if (sanitizedInput.length !== 6) {
        return Promise.reject(new Error(t('invalidVerificationCode')));
      }
    }
    return Promise.resolve();
  }
})

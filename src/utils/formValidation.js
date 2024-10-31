

export const validateName = (t) => ({
   
    pattern: /^[A-Za-z]+$/, 
    validator(_, value) {
      if (!value || /^[A-Za-z]+$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t("nameInvalid")));
    },
  })

  export const validateSurname = (t) => ({
    pattern: /^[A-Za-z]+$/, 
    validator(_, value) {
      if (!value || /^[A-Za-z]+$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t("nameInvalid")));
    },
  })

  export const validatePassword = (t) => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    validator(_, value) {
      if (!value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t("passwordInvalid")));
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
  


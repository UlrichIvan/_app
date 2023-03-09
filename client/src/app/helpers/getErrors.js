import { ERROR_NAME_MESSAGE, ERROR_PASSWORD_MESSAGE, rgxName, rgxPassword } from "../utils/utils"

export const getErrors = ({ name, password }) => {
    let data = { haserror: false, errors: [] }
    if (rgxName.test(name) && rgxPassword.test(password)) {
        return { haserror: false, errors: [{ errorName: "" }, { errorPassword: "" }] }
    } else {
        if (!rgxName.test(name)) {
            data.errors.push({ errorName: ERROR_NAME_MESSAGE })
        } else {
            data.errors.push({ errorName: "" })
        }
        if (!rgxPassword.test(password)) {
            data.errors.push({ errorPassword: ERROR_PASSWORD_MESSAGE })
        } else {
            data.errors.push({ errorPassword: "" })
        }
        return data
    }
}
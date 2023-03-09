
import { logInUser } from "../services/logInUser"
import { rgxName, rgxPassword } from "../utils/utils"

export const logUserIntoApp = async ({ username, userpassword }) => {

    if (rgxName.test(username) && rgxPassword.test(userpassword)) {
        try {
            let token = await logInUser({ username, userpassword })

            if (token) {
                return { token, logged: true }
            }
            else {
                return { token: null, logged: false }
            }
        } catch (error) {
            console.log(error.message)
            return { token: null, logged: false }
        }
    } else {
        return { token: null, logged: false }
    }
}

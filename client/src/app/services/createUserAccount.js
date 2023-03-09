import axios from "axios"
import { BASEURL } from "../utils/utils"

export const createUserAccount = async ({ name: username, password: userpassword }) => {
    return await axios.post(BASEURL + "/user/create", { username, userpassword }).then(res => {
        const { exists, created, error } = res.data
        if (created && !exists && !error) {
            return { exists, created, error: false }
        } else if (!created && exists && !error) {
            return { exists, created, error: false }
        } else {
            return { exists, created }
        }
    })
}
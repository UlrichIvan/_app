import axios from "axios"
import { BASEURL } from "../utils/utils"

export const logInUser = async ({ username, userpassword }) => {
    return await axios.get(BASEURL + "/user", { params: { username, userpassword } }).then(res => {
        let { status, token } = res.data
        if (status === 200) {
            localStorage.setItem("user-local", token)
            return token
        } else {
            return null
        }
    })

}
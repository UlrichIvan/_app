import axios from "axios"
import { BASEURL } from "../utils/utils"

export const fetUsersFromGroup = async (name = "") => {

    try {
        const res = await axios.get(BASEURL + "/users/group", {
            params: {
                token: localStorage.getItem('user-local'),
                groupname: name,
            },
            responseType: "json",
            timeout: 1000 * 15,
        })
        return res.data
    } catch (err) {
        return console.log(err.message)
    }
}
import axios from "axios"
import { BASEURL } from "../utils/utils"

export const getFriends = async () => {
    try {
        let response = await axios({
            url: `${BASEURL}/users`,
            method: "get",
            params: {
                token: localStorage.getItem('user-local') || null
            },
            responseType: "json",
            timeout: 60 * 1000
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}
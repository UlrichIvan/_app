import axios from "axios"
import { BASEURL } from "../utils/utils"

export const disconnectUser = async () => {
    const res = await axios({
        url: `${BASEURL}/disconnect`,
        method: "put",
        data: {
            token: localStorage.getItem('user-local')
        },
        responseType: "json",
        timeout: 1000 * 15,
    })
    return res.data
}
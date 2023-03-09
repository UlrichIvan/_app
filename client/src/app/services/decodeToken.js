import axios from "axios"
import { BASEURL } from "../utils/utils"

export const decodeToken = async () => {
    return axios.get(BASEURL + "/token", { params: { token: localStorage.getItem('user-local') } })
        .then((res) => {
            if (res.status === 200) {
                return res.data
            }
        })
}
import axios from "axios"
import { BASEURL } from "../../utils/utils"

export const fetchGroupsFromUser = async () => {
    try {
        let res = await axios.get(BASEURL + "/groups", {
            params: {
                token: localStorage.getItem('user-local')
            },
            responseType: "json",
            timeout: 1000 * 15,
        })
        return res.data

    } catch (err) {
        console.log(err.message)
    }
}
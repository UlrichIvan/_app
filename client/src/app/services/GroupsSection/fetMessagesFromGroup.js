import axios from "axios"
import { BASEURL } from "../../utils/utils"

export const fetMessagesFromGroup = async (name) => {
    try {
        let res = await axios.get(BASEURL + "/all-messages", {
            params: {
                token: localStorage.getItem('user-local'),
                name: name
            },
            timeout: 1000 * 15,
        })

        if (res.status === 200) {
            return res.data
        }

    } catch (error) {
        console.log(error.message)
    }
}
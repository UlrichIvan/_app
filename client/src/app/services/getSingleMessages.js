import axios from "axios";
import { BASEURL } from "../utils/utils";

export const getSingleMessages = async (name) => {
  let data = await axios
    .get(`${BASEURL}/single/messages`, {
      params: { token: localStorage.getItem("user-local"), name: name },
      timeout: 1000 * 15,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err.message));

  return data;
};

import { createUserAccount } from "../services/createUserAccount"
import { ERROR_OCCURED, NAME_ALL_READY_EXISTS } from "../utils/utils"
import { getErrors } from "./getErrors"

export const handlerSubmitCallback = async (state, dispatch, redirect) => {

    let { errors, haserror } = getErrors(state)

    if (haserror) {
        dispatch({ type: "all-errors", errors })
        dispatch({ type: "global-message", message: "" })
    } else {
        try {
            let { created, exists } = await createUserAccount(state)
            if (created) {
                dispatch({ type: "all-errors", errors })
                dispatch({ type: "global-message", message: "" })
                redirect("/login", { replace: true })
            } else if (exists) {
                dispatch({ type: "all-errors", errors })
                dispatch({ type: "global-message", message: NAME_ALL_READY_EXISTS })
            } else {
                dispatch({ type: "global-message", message: ERROR_OCCURED })
            }
        } catch (error) {
            dispatch({ type: "global-message", message: ERROR_OCCURED })
        }
    }
}
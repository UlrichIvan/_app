import { useCallback, useReducer } from "react"
import { Link, useNavigate } from "react-router-dom"
import Form from "../../components/Form/Form"
import { handlerSubmitCallback } from "../../helpers/handlerSubmitCallback"
import { handlerFormAccountReducer } from "../../reducers/handlerFormAccountReducer"
import { INIT_STATE_FORM_ACCOUNT } from "../../utils/utils"

function Account() {
    const [state, dispatch] = useReducer(handlerFormAccountReducer, INIT_STATE_FORM_ACCOUNT)
    const redirect = useNavigate()
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        handlerSubmitCallback(state, dispatch, redirect)
    }, [state, redirect, dispatch])

    return (
        <Form title='create account' onSubmit={handleSubmit} >
            {state.globaMessage && <small className='error'>{state.globaMessage}</small>}
            <div className="form-group text-white">
                <label htmlFor="name">name</label>
                <input
                    value={state.name}
                    onChange={(e) => (dispatch({ type: "setname", name: e.target.value }))}
                    autoFocus={"on"}
                    autoComplete='off'
                    className='text-white'
                    type="text" id="name"
                    placeholder='user name'
                />
                {state.errorName && <small>{state.errorName}</small>}
            </div>
            <div className="form-group text-white">
                <label htmlFor="password">password</label>
                <input
                    value={state.password}
                    onChange={(e) => (dispatch({ type: "setpassword", password: e.target.value }))}
                    type="password"
                    className='text-white'
                    id="password"
                    placeholder='your password'
                />
                {state.errorPassword && <small>{state.errorPassword}</small>}
            </div>
            <div className="btn-submit">
                <button type='submit' className="btn-success">
                    create
                </button>
            </div>
            <small className='no-account'>
                <Link to="/login">Already have account ? login the chat </Link>
            </small>
        </Form>
    )
}

export default Account

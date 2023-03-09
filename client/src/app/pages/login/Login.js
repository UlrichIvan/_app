import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/Form/Form'
import { logUserIntoApp } from '../../helpers/logUserIntoApp'
import { LOGIN_ERROR_MESSAGE } from '../../utils/utils'

function Login() {
    const [username, setUserName] = useState("")
    const [userpassword, setUserPassword] = useState("")
    const [errormessage, setErrorMessage] = useState("")
    const redirect = useNavigate()

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        let { logged, token } = await logUserIntoApp({ username, userpassword })

        if (logged && token) {
            setErrorMessage("")
            redirect("/chat", { replace: true, state: { username } })
        } else {
            setErrorMessage(LOGIN_ERROR_MESSAGE)
        }
    }, [username, userpassword, setErrorMessage, redirect])


    return (
        <>
            <Form title='Chat login' onSubmit={handleSubmit}>
                {errormessage && <small className='error'>{errormessage}</small>}
                <div className="form-group text-white">
                    <label htmlFor="name">name</label>
                    <input
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        autoFocus={"on"}
                        autoComplete='off'
                        className='text-white'
                        type="text" id="name"
                        placeholder='user name'
                    />
                </div>
                <div className="form-group text-white">
                    <label htmlFor="password">password</label>
                    <input
                        value={userpassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        type="password"
                        className='text-white'
                        placeholder='your password'
                    />
                </div>
                <div className="btn-submit">
                    <button type='submit' className="btn-success">
                        log in
                    </button>
                </div>
                <small className='no-account'>
                    <Link to="/account">You d'ont have account ? create it </Link>
                </small>
            </Form>
        </>
    )
}

export default Login

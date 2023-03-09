import Form from '../../components/navbar/Form'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { rgxName, rgxPassword } from "../../utils"

axios.defaults.baseURL = 'http://localhost:4000'

function Connexion() {
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState('')
    const navigate = useNavigate()

    const onNameChange = (e) => {
        setname(e.target.value)
    }

    const onPasswordChange = (e) => {
        setpassword(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (rgxName.test(name) && rgxPassword.test(password)) {
            axios({
                url: 'user-connect',
                method: "post",
                data: {
                    name,
                    password
                },
                responseType: "json",
            }).then((res) => {
                let user = res.data
                if (user && user.status === 200) {
                    localStorage.setItem('user', user.token)
                    navigate('/chat', { replace: true })
                } else {
                    seterror(true)
                    setmessage('invalid name or password')
                }
            }).catch(_ => setmessage('error occured please try again'))
        } else {
            seterror(true)
            setmessage('invalid name or password')
        }
    }

    return (
        <Form title='Chat login' onSubmit={onSubmit}>
            {error && <small className='error'>{message}</small>}
            <div className="form-group text-white">
                <label htmlFor="name">name</label>
                <input
                    autoFocus={"on"}
                    onChange={onNameChange}
                    value={name}
                    autoComplete='off'
                    className='text-white'
                    type="text" id="name"
                    placeholder='user name'
                />
            </div>
            <div className="form-group text-white">
                <label htmlFor="password">password</label>
                <input
                    onChange={onPasswordChange}
                    value={password}
                    type="password"
                    className='text-white'
                    id="password"
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
    )
}

export default Connexion

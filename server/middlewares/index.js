const jwt = require('jsonwebtoken')
const { rgxName, rgxPassword } = require('../constants')

const validQueryToken = (req, res, next) => {

    try {
        let user = jwt.verify(req.query.token, 'demo')
        req.user = user
        next()
    } catch (err) {
        sendResponseFromToken(err, res)
    }
}
const dataIsValided = (req, res, next) => {
    const { username, userpassword } = Object.keys(req.query).length ? req.query : req.body
    if (rgxName.test(username) && rgxPassword.test(userpassword)) {
        req.username = username
        req.userpassword = userpassword
        next()
    } else {
        res.status(500).json({ logged: false })
    }
}
const sendResponseFromToken = (err, res) => {
    switch (err.message) {
        case "invalid token":
            res.status(401).json({
                message: err.message
            })
        default:
            console.log(err.message)
            res.status(401).json({
                message: err.message
            })
            break;
    }
}
const validBodyToken = (req, res, next) => {
    try {
        let user = jwt.verify(req.body.token, 'demo')
        req.user = user
        next()
    } catch (err) {
        sendResponseFromToken(err, res)
    }
}
const tokenIsvalid = (token) => {
    try {
        let user = jwt.verify(token, 'demo')
        return user
    } catch (err) {
        return {}
    }
}

module.exports = { validQueryToken, dataIsValided, validBodyToken, tokenIsvalid }
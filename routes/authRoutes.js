// 
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10
const JWT_KEY = "MY_JWT_KEY"
const DataBase = []
const AuthRoutes = express.Router()


AuthRoutes.post("/signin", async function (req, res) {
    const { username, password } = req.body
    const checkUsername = await checkUsernameInDatabase(username, DataBase)
    if (!checkUsername) {
        return res.status(400).send("username or password incorrect")
    }
    const passwordMatch = await bcrypt.compare(password, checkUsername.password)
    if (!passwordMatch) {
        return res.status(400).send("username or password incorrect")
    }

    const jwt_token = jwt.sign({ username}, JWT_KEY)
    return res.status(200).send({ token: jwt_token })
})
AuthRoutes.post("/signup", async function (req, res) {
    const { username, password } = req.body
    const checkUsername = await checkUsernameInDatabase(username, DataBase)
    if (checkUsername) {
        return res.status(403).send("username already exist")
    }
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
    updateDataBase({ username: username, password: hashPassword }, DataBase)

    return res.status(200).send("User registerd , proceed to sign in")
})

AuthRoutes.post("/recover", function (req, res) {
    return res.status(403).json({ message: "Not Possible " })
 })
AuthRoutes.post("/signout", function (req, res) { })
AuthRoutes.get("/dashboard", function (req, res) { })
AuthRoutes.get("/audit", function (req, res) { })

function checkUsernameInDatabase(username, DataBase) {
    const userMatch = DataBase.find(user => user.username === username)
    return userMatch
}
function updateDataBase(resFields, DataBase) {
    DataBase.push({ username: resFields.username, password: resFields.password })
}

export default AuthRoutes
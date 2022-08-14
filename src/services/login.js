import axios from "axios"
const baseUrl = 'http://localhost:3003/login'

const signIn = async loginCred => {
    const resp = await axios.post(baseUrl, loginCred)
    return resp.data
}

const signUp = async loginCred => {
    const resp = await axios.post('http://localhost:3003/api/users', loginCred)
    return resp.data
}

const pwdReset = async (username, loginCred) => {
    const resp = await axios.put(`http://localhost:3003/api/user/${username}`, loginCred)
    return resp.data
}

export default { signIn, signUp, pwdReset } 
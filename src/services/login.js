import axios from "axios"
const baseUrl = 'https://agile-hamlet-57701.herokuapp.com/login'

const signIn = async loginCred => {
    const resp = await axios.post(baseUrl, loginCred)
    return resp.data
}

const signUp = async loginCred => {
    const resp = await axios.post('https://agile-hamlet-57701.herokuapp.com/api/users', loginCred)
    return resp.data
}

const pwdReset = async (username, loginCred) => {
    const resp = await axios.put(`https://agile-hamlet-57701.herokuapp.com/api/user/${username}`, loginCred)
    return resp.data
}

export default { signIn, signUp, pwdReset } 
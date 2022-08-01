import axios from "axios";

const baseUrl = 'http://localhost:3003/api/login';

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async loginCred => {
    const config = {
        headers: { Authorization: token }
    }

    const resp = await axios.post({baseUrl}, loginCred, config)
    return resp.data
}

export {create, setToken}
import axios from "axios";

const baseUrl = 'http://localhost:3003/api/blogs';

let token  = null

const setToken  = newToken => {
    token = `bearer ${newToken}`
}

const config = () => {
        return {
        headers: { Authorization: token }
    }
} 

const getAll = async () =>{
    try {
        const req = axios.get(baseUrl, config())
        const resp = await req
        return resp.data 
    } catch (err) {
        if(err.response.data.error === 'token expired'){
           window.localStorage.removeItem('blogUser')
           throw new Error(err.response.data.error)

        }
    }
    
}

const create = async blog => {
    try{
        const resp = await axios.post(baseUrl, blog, config())
        return resp.data
    } catch(err){
        if(err.response.data.error === 'token expired'){
            window.localStorage.removeItem('blogUser')
            throw new Error(err.response.data.error)
         }
    }
    
}
const deleteBlog = async (id) => {
    try {
        const resp = await axios.delete(`${baseUrl}/${id}`, config())
        return resp.data
    } catch (err) {
        if(err.response.data.error === 'token expired'){
            window.localStorage.removeItem('blogUser')
            throw new Error(err.response.data.error)
         }else{
            throw new Error(err.response.data.error)
         }
    }
    
}
const update = async ({ blog, id }) =>{
    const resp = await axios.put(`${baseUrl}/${id}`, blog, config())

    return resp.data
}


export default { getAll, create, deleteBlog,  update, setToken}
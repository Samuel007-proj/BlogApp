
const default_state = {}

export const user_reducer = (state = default_state, action) => {
    switch(action.type){
        case 'user/create':{
            window.localStorage.setItem('blogUser', JSON.stringify(action.payload))
            return action.payload
        }
        case 'user/delete':{
            window.localStorage.removeItem('blogUser')
            return {}
        }
        default: return state
    }
}



const default_state = []

export const blog_reducer = (state = default_state, action) => {
    switch(action.type){
        case 'blog/create':
            return action.payload;
        case 'blog/update':
            return [...state, action.payload]
        case 'blog/like':
            return state.map(blog => { return blog.id === action.payload.id ?  action.payload : blog })
        case 'blog/delete':
            return state.filter(b => b.id !== action.payload)
        default: return state
    }
}


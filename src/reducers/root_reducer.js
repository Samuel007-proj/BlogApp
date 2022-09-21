import { blog_reducer } from "./blog_reducer"
import { user_reducer } from "./user_reducer"

const combineReducers = slices =>  (state, action) =>
        Object.keys(slices).reduce(
            (acc, prop) =>  ({ ...acc, [prop]: slices[prop](acc[prop], action)}), state
        )
    

export const root_reducer = combineReducers({blogs: blog_reducer, user: user_reducer})


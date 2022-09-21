import { useStore } from "./store"
import Blog from './views/blogPage'
import { LoginSignUp } from './views/login'

const BlogPage = () => {
    const state = useStore()[0]
    console.log(state)

    return (
        <div>
            {
                (!state.user.name) ? <LoginSignUp  /> : <Blog />
            }
        </div>
        
    )
}

export default BlogPage
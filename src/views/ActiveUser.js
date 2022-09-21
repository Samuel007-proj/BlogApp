import { useStore } from "../store"

export const ActiveUser = ({ msg, setMsgTime, stats }) => {
    const [state, dispatch] = useStore()
    const handleLogout = e  => {
        e.preventDefault()
        
        try{
            const confirmLogout = window.confirm('are you sure')
            if(confirmLogout){
                dispatch({type: 'user/delete'})     
                setMsgTime({ ...msg, info: `${state.user.username} logged out` })

            } 
        } catch(err){
            setMsgTime({ ...msg, error: err.message })
        } 
    }

    return(
        <div className="mr-0 ml-auto flex flex-wrap flex-col text-sm items-end max-w-lg capitalize">
            <form onSubmit={handleLogout} className="mr-0 ml-auto font-semibold text-sm">
                <label>{state.user.username}</label>
                <button className="shrink-0 px-2 py-1 ml-3 border border-slate-200 hover:bg-slate-400 hover:text-slate-100 text-md rounded-lg font-light text-sm">logout</button>
            </form>
            <div className=" text-sm py-3">
                {
                    stats.nostats 
                    ? 
                        <div className=" flex flex-wrap flex-col items-end">
                            <p><span className="font-bold">{stats.nostats}</span></p>
                        </div>
                    :   
                        <div className=" flex flex-wrap flex-col items-end text-end ">
                            <p><span className="font-bold">{stats.blogsLength}</span> blogs</p>
                            <p><span className="font-bold">{stats.totalLikes}</span> totalLikes</p>
                            <p className="grow-0">most liked blog: <span className="font-bold">{stats.mostLikedBlogTitle}</span></p>
                        </div>
                    
                }
            </div>
        </div>
        
    )
}
import { useRef } from "react";
import services from "../services/services"
import { useStore } from "../store";
import Togglable from "./Togglable";

export const UsersBlogs = ({ setStats }) => {
    const [state, dispatch] = useStore()
    const blogRef = useRef()

    const itemsRef = useRef()

    const getMap = () => {
        if(!itemsRef.current){
            itemsRef.current = new Map()
        }
        return itemsRef.current
    }

    const delete_blog = async (id, username) => {
        const map = getMap()
        const node = map.get(id)
        console.log(node.id, username)
        console.log(map)

        const activeUser = state.user.username
    
        if( activeUser === username ){
            try{
               await services.deleteBlog(id)
            }catch ( err ) {
                alert(err.message)
            }
            dispatch({type: 'blog/delete', payload: id})

        } else {
            alert('You are not allowed to delete this blog')
        }

        let stats = await services.getStats(activeUser)
        if(stats){
            setStats(stats)
        }

    } 

    const handleLike = async id => {
        console.log(id)
        
        try{
            const update = {
                item: 'likes'
            }
            let payload = await services.update(update, id)
            console.log(payload)
            

            if(payload){
                dispatch({type: 'blog/like', payload})
            }
        }catch(err){
            console.log(err)
        }
        

    }

    return(
        <div className="max-w-full md:max-w-[80%] lg:max-w-[75%] mx-auto border-none md:border md:border-slate-200 rounded-md mb-10 md:max-h-96 md:overflow-auto ">
            <ul className="list-none px-6 divide-y divide-slate-200 text-slate-500 max-w-full ">
                {
                    state.blogs.noblogs
                    ?
                        <div>
                            <p>{state.blogs.noblogs}</p>
                        </div>
                    :
                        state.blogs.map((blog) => {
                            
                            return <li id={blog.id} 
                                ref={ node => {
                                        const map = getMap();
                                        node ? map.set(blog.id, node) : map.delete(blog.id);
                                        
                                    } }
                            className="flex flex-col flex-wrap max-w-full py-5 items-baseline">
                                        
                                        <div className=" grow-0 w-full ">
                                            <p className=" truncate text-slate-600 font-bold ">{blog.title}</p>
                                            <Togglable buttonLabel="show more" exit="show less" ref={blogRef}>
                                                <div>
                                                    <p className=" truncate ">{blog.author}</p>
                                                    <p className=" truncate ">{`${blog.likes}K`}
                                                        <span >
                                                            <button onClick={ ()=> handleLike(blog.id) }
                                                                className = "ml-5 px-2 border boder-slate-300 rounded-lg text-slate-300 active:bg-slate-300 active:text-slate-50 "
                                                                >like</button>
                                                        </span>
                                                        </p>
                                                    <p className=" truncate underline underline-offset-2 decoration-sky-300 decoration-solid decoration-from-font grow-0 italic text-blue-500 active:text-blue-500 visited:text-indigo-400"><a  target='blank' href={blog.url}>{blog.url}</a></p> 
                                                </div>
                                            </Togglable>
                                            </div>

                                        <div className="flex flex-row-reverse shrink-0 mt-1 w-full md:w-1/3 md:mr-0 md:ml-auto">
                                            <div className=" mr-0 ml-auto">
                                                <button 
                                                    onClick={() => delete_blog(blog.id, blog.user?.username)}
                                                    className=" py-1 px-2 border border-slate-300 active:bg-slate-300 text-sm font-semibold text-slate-400 active:text-slate-50 rounded-lg">delete</button>
                                            </div>
                                            <div className=" italic capitalize text-slate-400 font-semibold text-sm block my-2 md:mr-0 md:ml-auto">
                                                { blog.user?.username ? <p>{blog.user.username}</p> : ''}
                                            </div>
                                        </div>
                                        
                                    </li>
                    })
                }
            </ul>
        </div>
    )
}
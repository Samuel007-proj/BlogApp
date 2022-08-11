import React, { useEffect, useState } from "react";
import { InputComp, Button } from "./login";
import services from "../services/services"

const Blog = ({ user, setUser }) => {

    const [blogs, setBlogs] = useState([])
    const [msg, setMsg] = useState({info: '', error: ''})
    const [stats, setStats] = useState({})

    
    useEffect(() => {
        const userString = window.localStorage.getItem('blogUser')
        if(userString){
            services.setToken(user.token)
        } else {
            setUser(null)
        }   
    }, [user, setUser])

    useEffect(()=> {
        (async ()=>{
            try{
                const blogs = await services.getAll()
                if(blogs){
                    setBlogs(blogs)
                }
                const username = await user.username
                const userStats = await services.getStats(username)
                if(userStats){
                    setStats(userStats)
                }
            } catch (err) {
                alert(`${err.message}, logging out`)
                console.log(err.message)
                setUser(null)
            }
            
            
        })()
        
    }, [setUser, user])

    return(
        <div>
            <div className="flex flexwrap w-full mb-10 pt-5 pb-5 items-baseline shadow-sm">
                <div className="text-3xl text-slate-500 font-bold tracking-wide w-full pl-[5%] md:pl-[10%] lg:text-4xl lg:pl-[12.5%]">
                    <h1>Blogs</h1>
                </div>
                <div className="text-normal text-slate-400 font-normal tracking-wide shrink-0 pr-[5%] md:pr-[10%] lg:pr-[12.5%] lg:text-xl">
                    <ActiveUser user={user} setUser={setUser} msg={msg} setMsgTime={setMsg} stats={stats} />
                </div>
            </div>
            { (msg.info || msg.error) && <Msg msg={msg}/> }
            <NewBlogForm setMsgTime={setMsg} msg={msg} setBlogs={setBlogs} blogs={blogs} setUser={setUser}/>
            <UsersBlogs blogs={blogs} setBlog={setBlogs} user={user}/>
        </div>
    )
}

const ActiveUser = ({ user, setUser, msg, setMsgTime, stats }) => {
    const handleLogout = e  => {
        e.preventDefault()
        
        try{
            const confirmLogout = window.confirm('are you sure')
            if(confirmLogout){
                window.localStorage.removeItem('blogUser')
                setUser(null)     
            } 
            setMsgTime({ ...msg, info: `${user.username} logged out` })
        } catch(err){
            setMsgTime({ ...msg, error: err.message })
        } 
    }

    return(
        <div>
            <form onSubmit={handleLogout}>
                <label>{user.username}</label>
                <button className="shrink-0 px-2 py-1 ml-3 border border-slate-200 hover:bg-slate-400 hover:text-slate-100 text-md rounded-lg font-light text-sm">logout</button>
        </form>

        <div className="flex flexwrap flex-col text-sm px-2, py-3">
            <p><span className="font-bold">{stats.blogsLength}</span> blogs</p>
            <p><span className="font-bold">{stats.totalLikes}</span> totalLikes</p>
            <p>most liked blog:<span className="font-bold">{stats.mostLikedBlogTitle}</span></p>
        </div>
        </div>
        
    )
}

const NewBlogForm = ({ setMsgTime, msg, setBlogs, blogs, setUser}) => {
    let [blogEntry, setBlogEntry] = useState({
        title:'',
        author: '',
        url: ''
    })

    const handleNewBlog = async (e) => {
        e.preventDefault()
        const newBlog = {
            title: blogEntry.title,
            author: blogEntry.author,
            url: blogEntry.url,
            likes: Math.floor(100 * Math.random())
        }
        try{
            const savedBlog = await services.create(newBlog)
            if(savedBlog) setBlogs( blogs.concat(savedBlog) )
            setBlogEntry({title: '', author: '', url: ''})
            alert(`Created ${savedBlog.title}`)
        } catch(err){
            setMsgTime({...msg, error: err.message})
            alert('logging out')
            setUser(null)
        }
  
    }
    return (
        <div className="w-[90%] mx-auto mb-10 p-3 border border-slate-200 rounded-md shadow-md md:w-[80%] lg:w-[75%] lg:text-xl">
            <form onSubmit={handleNewBlog}>
                <InputComp title="Blog's title" type="text" value={blogEntry.title} change={ e => setBlogEntry({...blogEntry, title: e.target.value}) }/>
                <InputComp title="Blog's Author" type="text" value={blogEntry.author} change={e => setBlogEntry({...blogEntry, author: e.target.value})}/>
                <InputComp title="Blog's reference url" type="text" value={blogEntry.url} change={e => setBlogEntry({...blogEntry, url: e.target.value})} />
                <Button type="submit" content="Save blog Reference"/>
            </form>
        </div>
    )
    
}

const UsersBlogs = ({blogs, setBlog, user}) => {

    const handleDeletion = async (event) => {
        event.preventDefault()
        const blogToDelete = JSON.parse(event.target.attributes.blogtodelete.value)
        const blogToDeleteUser = blogToDelete?.user?.username
        const activeUser = user.username
        const id = blogToDelete.id

        if( activeUser === blogToDeleteUser){
            try{
               await services.deleteBlog(id)
            }catch ( err ) {
                alert(err.message)
            }
            setBlog(blogs.filter( blog => blog.id !== id))

        } else {
            alert('You are allowed to delete this blog')
        }
    }

    return(
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto border border-slate-200 rounded-md mb-10 flexwrap md:max-h-96 md:overflow-auto ">
            <ul className="list-none p-6 divide-y divide-slate-200 text-slate-500">
                {
                    blogs.map((blog) => {
                            return <li id={blog.id} className=" flex w-full py-4 items-baseline">
                                        
                                        <div className="w-full">
                                            <p className="text-slate-600 font-bold ">{blog.title}</p>
                                            <p>{blog.author}</p>
                                            <p>{`${blog.likes}K`}</p>
                                            <p className="underline italic text-blue-500 active:text-blue-500 visited:text-indigo-400"><a  target='blank' href={blog.url}>{blog.url}</a></p> 
                                        </div>

                                        <div className=" italic text-slate-400 font-normal block ">
                                            { blog.user?.username ? <p>Posted by {blog.user.username}</p> : ''}
                                        </div>
                                        <form blogtodelete={ JSON.stringify(blog) } onSubmit={ handleDeletion }>
                                            <button className="shrink-0 p-2 ml-5 border border-slate-400 hover:border-none hover:bg-slate-400 text-sm font-semibold text-slate-400  hover:text-slate-100 border rounded-lg">delete</button>
                                        </form>
                                    </li>
                    })
                }
            </ul>
        </div>
    )
}

const Msg = ({ msg }) => {
    return(
        <div className="text-normal tracking-wide text-slate-500 font-bold p-2 w-[90%] md:w-[80%] lg:w-[75%] border border-yellow-300 bg-yellow-100 rounded-sm shadow-sm mb-10 mx-auto text-center">
            <p>{ msg.info || msg.error }</p>
        </div>
    )
}

export default Blog
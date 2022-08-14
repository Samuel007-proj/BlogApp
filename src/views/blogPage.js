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
    })

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
                if(err === 'token expired'){
                    alert(`${err.message}, logging out`)
                    console.log(err)
                    setUser(null)
                }
                
            }
            
            
        })()
        
    }, [blogs])

    return(
        <div>
            <div className="flex flex-wrap max-w-full mb-10 pt-10 pb-5 items-baseline shadow-md bg-slate-50">
                <div className="text-3xl text-slate-500 font-bold tracking-wide w-1/3 pl-[5%] md:pl-[10%] lg:text-4xl lg:pl-[12.5%]">
                    <h1>Blogs</h1>
                </div>
                <div className=" w-2/3 text-normal text-slate-400 font-normal tracking-wide shrink-0 pr-[5%] md:pr-[10%] lg:pr-[12.5%] lg:text-xl">
                    <ActiveUser user={user} setUser={setUser} msg={msg} setMsgTime={setMsg} stats={stats} />
                </div>
            </div>
            { (msg.info || msg.error) && <Msg msg={msg}/> }
            <NewBlogForm setMsgTime={setMsg} msg={msg} setBlogs={setBlogs} blogs={blogs} setUser={setUser} setStats={setStats} username={user.username}/>
            <UsersBlogs blogs={blogs} setBlog={setBlogs} user={user} setStats={setStats}  />
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
                setMsgTime({ ...msg, info: `${user.username} logged out` })

            } 
        } catch(err){
            setMsgTime({ ...msg, error: err.message })
        } 
    }

    return(
        <div className="mr-0 ml-auto flex flex-wrap flex-col text-sm items-end max-w-lg capitalize">
            <form onSubmit={handleLogout} className="mr-0 ml-auto font-semibold text-sm">
                <label>{user.username}</label>
                <button className="shrink-0 px-2 py-1 ml-3 border border-slate-200 hover:bg-slate-400 hover:text-slate-100 text-md rounded-lg font-light text-sm">logout</button>
            </form>
            <div className=" text-sm text-sm py-3">
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

const NewBlogForm = ({ setMsgTime, msg, setBlogs, blogs, setUser, setStats, username}) => {
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

        let stats = await services.getStats(username)
        if(stats){
            setStats(stats)
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

const UsersBlogs = ({blogs, setBlog, user, setStats}) => {

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

        let stats = await services.getStats(activeUser)
        if(stats){
            setStats(stats)
        }
    }

    return(
        <div className="max-w-full md:max-w-[80%] lg:max-w-[75%] mx-auto border-none md:border md:border-slate-200 rounded-md mb-10 md:max-h-96 md:overflow-auto ">
            <ul className="list-none px-6 divide-y divide-slate-200 text-slate-500 max-w-full ">
                {
                    blogs.noblogs
                    ?
                        <div>
                            <p>{blogs.noblogs}</p>
                        </div>
                    :
                        blogs.map((blog) => {
                            return <li id={blog.id} className="flex flex-col flex-wrap max-w-full py-5 items-baseline">
                                        
                                        <div className=" grow-0 w-full ">
                                            <p className=" truncate text-slate-600 font-bold ">{blog.title}</p>
                                            <p className=" truncate ">{blog.author}</p>
                                            <p className=" truncate ">{`${blog.likes}K`}</p>
                                            <p className=" truncate underline underline-offset-2 decoration-sky-300 decoration-solid decoration-from-font grow-0 italic text-blue-500 active:text-blue-500 visited:text-indigo-400"><a  target='blank' href={blog.url}>{blog.url}</a></p> 
                                        </div>

                                        <div className="flex flex-row-reverse shrink-0 mt-5 w-full md:w-1/3 md:mr-0 md:ml-auto">
                                            <form blogtodelete={ JSON.stringify(blog) } onSubmit={ handleDeletion } className=" mr-0 ml-auto">
                                                <button className=" py-2 px-8 border border-slate-400 hover:bg-slate-400 text-sm font-semibold text-slate-400 hover:text-slate-100 rounded-lg">delete</button>
                                            </form>
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

const Msg = ({ msg }) => {
    return(
        <div className="text-normal tracking-wide text-slate-500 font-bold p-2 w-[90%] md:w-[80%] lg:w-[75%] border border-yellow-300 bg-yellow-100 rounded-sm shadow-sm mb-10 mx-auto text-center">
            <p>{ msg.info || msg.error }</p>
        </div>
    )
}

export default Blog
import React, { useEffect, useState, useRef } from "react";
import services from "../services/services"
import { useStore } from "../store";
import BlogForm from "./blogForm";
import { ActiveUser } from './ActiveUser'
import { UsersBlogs } from './UsersBlogs'
import Togglable from "./Togglable";


const Blog = () => {

    const [state, dispatch] = useStore()
    const [msg, setMsg] = useState({info: '', error: ''})
    const [stats, setStats] = useState({})
    
    const blogFormRef = useRef()

    useEffect(() => {
        const user =state.user
        if(user){
            services.setToken(user.token)
        }   
    })

    useEffect(()=> {
        (async ()=>{
            try{
                const blogs = await services.getAll()
                if(blogs){
                    dispatch({type: 'blog/create', payload: blogs})
                }

                const userStats = await services.getStats(state.user.username)
                if(userStats){
                    setStats(userStats)
                }
            } catch (err) {
                if(err === 'token expired'){
                    alert(`${err.message}, logging out`)
                    console.log(err)
                }
                
            }
            
            
        })()
        
    }, [])


    const addBlog = async newBlog => {
        
        try{
            const savedBlog = await services.create(newBlog)
            if(savedBlog) dispatch( {type: 'blog/update', payload: savedBlog} )
            blogFormRef.current.toggleVisibility()
            alert(`Created ${savedBlog.title}`)
            let stats = await services.getStats(state.user.username)
            if(stats){
                setStats(stats)
            }
            return true
        } catch(err){
            setMsg({...msg, error: err.message})
            if(err === 'token expired'){
                alert('logging out')
                return false
            }
            return false
            
        }

        

    }

    return(
        <div>
            <div className="flex flex-wrap max-w-full mb-10 pt-10 pb-5 items-baseline shadow-md bg-slate-50">
                <div className="text-3xl text-slate-500 font-bold tracking-wide w-1/3 pl-[5%] md:pl-[10%] lg:text-4xl lg:pl-[12.5%]">
                    <h1>Blogs</h1>
                </div>
                <div className=" w-2/3 text-normal text-slate-400 font-normal tracking-wide shrink-0 pr-[5%] md:pr-[10%] lg:pr-[12.5%] lg:text-xl">
                    <ActiveUser msg={msg} setMsgTime={setMsg} stats={stats} />
                </div>
            </div>
            <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[75%] mx-auto">
                { (msg.info || msg.error) && <Msg msg={msg}/> }
                <Togglable buttonLabel='new blog' ref={blogFormRef} exit="cancel entry">
                    <BlogForm  addBlog={addBlog}/>
                </Togglable>
                <UsersBlogs setStats={setStats}  />
            </div>
            
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
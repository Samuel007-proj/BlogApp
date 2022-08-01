import React, { useState } from "react";
import { InputComp, Button } from "./login";

const Blog = ({ setisLoggedIn }) => {

    const [msg, setMsg] = useState(false)

    const handleLogout = e  => {
        e.preventDefault()
        const confirmLogout = window.confirm('are you sure')
        if(confirmLogout) alert('username logged out')
    }
    return(
        <div>
            <div className="flex flexwrap w-full mb-10 pt-5 pb-5 items-baseline shadow-sm">
                <div className="text-3xl text-slate-500 font-bold tracking-wide w-full pl-[5%] md:pl-[10%] lg:text-4xl lg:pl-[12.5%]">
                    <h1>Blogs</h1>
                </div>
                <div className="text-normal text-slate-400 font-normal tracking-wide shrink-0 pr-[5%] md:pr-[10%] lg:pr-[12.5%] lg:text-xl">
                    <form onSubmit={handleLogout}>
                        <label>Username</label>
                        <button className="shrink-0 px-2 py-1 ml-3 border border-slate-200 text-md rounded-lg font-light text-sm">logout</button>
                    </form>
                    
                </div>
            </div>
            {msg && <NewBlogSubmit />}
            <NewBlogForm setMsgTime={setMsg}/>
            <UsersBlogs blogs={blogs}/>
        </div>
    )
}

const ActiveUser = () => {

}

const NewBlogForm = ({ setMsgTime }) => {
    let [blogEntry, setBlogEntry] = useState({
        title:'',
        author: '',
        url: ''
    })

    const handleNewBlog = e => {
        e.preventDefault()
        setBlogEntry({title: '', author: '', url: ''})
        setTimeout( ()=> setMsgTime(false), 5000)
        setMsgTime(true)
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

const UsersBlogs = ({blogs}) => {
    return(
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto border border-slate-200 rounded-md mb-10 flexwrap">
            <ul className="list-none p-6 divide-y divide-slate-200">
                {
                    blogs.map((blog, index) => {
                        return <li id={index} className=" flex py-4 items-baseline">
                                    <p className="w-full">{blog}</p>
                                    <button className="shrink-0 p-2 ml-5 border-none bg-slate-400 text-md text-slate-100 border rounded-lg">delete</button>
                                </li>
                    })
                }
            </ul>
                
        </div>
    )
}

const NewBlogSubmit = () => {
    return(
        <div className="text-normal tracking-wide text-slate-500 font-bold p-2 w-[90%] md:w-[80%] lg:w-[75%] border bg-yellow-300 rounded-sm shadow-sm mb-10 mx-auto text-center">
            <p>A new blog by Username added</p>
        </div>
    )
}
const blogs =[
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus incidunt praesentium aliquam laudantium quae temporibus quia non beatae harum, a distinctio officiis dicta ipsam tenetur quo molestias nisi officia neque.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam accusamus beatae cupiditate voluptatem vitae enim. Corporis, rerum alias repellendus perspiciatis nesciunt perferendis quam at quae possimus, culpa adipisci nulla?",
"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt fuga veritatis impedit provident nemo voluptates obcaecati optio ad distinctio, ut et, accusantium animi veniam qui ipsum molestias totam, ratione eius.",
"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, amet eos laboriosam qui temporibus voluptate perspiciatis reprehenderit voluptates est omnis neque, dignissimos consectetur magni? Nihil impedit magnam consectetur laboriosam officia?",
"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto minima repellendus libero repudiandae similique obcaecati corrupti. Quas fugiat veniam sed minus. Alias laboriosam nobis dolorem! Quaerat laboriosam inventore aperiam optio.",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quibusdam fuga eligendi suscipit sint quas aspernatur consectetur, tenetur nulla earum numquam ullam est molestiae impedit soluta laboriosam. Distinctio, enim. Itaque."
]

export default Blog
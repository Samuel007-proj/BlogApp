import { useState } from "react";
import { InputComp, Button } from "./login";

const BlogForm = ({ addBlog}) => {
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

        if(await addBlog(newBlog)) {
            setBlogEntry({
                title:'',
                author: '',
                url: ''
            })
        }

         
    }
    return (
        <div className="max-w-[90%] mx-auto p-3 border border-slate-200 rounded-md shadow-md md:max-w-[80%] lg:max-w-[75%] lg:text-xl">
            <form onSubmit={handleNewBlog}>
                <InputComp title="Blog's title" type="text" value={blogEntry.title} change={ e => setBlogEntry({...blogEntry, title: e.target.value}) }/>
                <InputComp title="Blog's Author" type="text" value={blogEntry.author} change={e => setBlogEntry({...blogEntry, author: e.target.value})}/>
                <InputComp title="Blog's reference url" type="text" value={blogEntry.url} change={e => setBlogEntry({...blogEntry, url: e.target.value})} />
                <Button type="submit" content="Save blog Reference"/>
            </form>
        </div>
    )
    
}

export default BlogForm;
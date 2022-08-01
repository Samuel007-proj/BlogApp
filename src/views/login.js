import React, { useState } from "react"

const Login = ({ setLog }) => {
    const [name, setName] = useState('')
    const [Uname, setUname] = useState('')
    const [pwd, setPwd] = useState('')

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        alert(`${name} ${Uname} ${pwd}`)
        setLog(true)
    }

    return (
        <div className="flex flex-col p-6 m-auto w-[75%] md:w-[55%] lg:w-[40%] max-h-[50%] mt-6 ">
            <div className='text-left md:text-center'>
                <h1 className=" text-lg text-indigo-900 font-bold tracking-wide md:text-xl lg:text-3xl ">Blog App</h1>
            </div>
            <div className="block mt-3 md:mt-5 border border-slate-400 p-3 rounded-lg">
                <form onSubmit={handleLoginSubmit}>
                    <InputComp title="Name" type="text" value={name} change={ e=> setName(e.target.value)}/>
                    <InputComp title="Username" type="text" value={Uname} change={ e=> setUname(e.target.value)} />
                    <InputComp title="Password" type="text" value={pwd} change={ e=> setPwd(e.target.value)} />
                    <Button type="submit" content="Submit to login"/>
                </form>
            </div>
        </div>
    )
}

const InputComp =({ title, type, value, change})=>{
    return(
        <div>
            <label className='block text-sm font-medium text-slate-700 mt-5'>{title}
                <input required type={type} value={value} onChange={change}  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'/>
            </label>
        </div>
    )
}

const Button = ({type, content}) =>{
    return(
        <button type={type} className="mt-8 w-full px-3 py-3 bg-blue-900 border border-blue-100 rounded-md outline-none text-md font-normal text-slate-50 tracking-wide">{content}</button>
    )
}

export {Login , InputComp, Button}
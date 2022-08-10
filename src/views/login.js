import React, { useState } from "react"
import  login  from "../services/login"

const LoginSignUp = ({ setUser }) => {
    const [signUp , setSignUp] = useState(true)

    const handleSigns =  (e) => {
        e.preventDefault()

        setSignUp(!signUp)
    }
    return(
        <div className="flex flex-col p-6 m-auto w-[75%] md:w-[55%] lg:w-[40%] max-h-[50%] mt-6 border border-slate-400 p-3 rounded-lg ">
            <div className='text-left md:text-center'>
                <h1 className=" text-lg text-indigo-900 font-bold tracking-wide md:text-xl lg:text-3xl ">Blog App</h1>
            </div>
            
            <form onSubmit={ handleSigns }>
                <button type="submit" className=" border-none mt-8 w-full px-3 py-3 rounded-md outline-none text-md font-normal text-slate-700 bg-slate-100 hover:bg-slate-200 tracking-wide">
                    { signUp ? "Sign-up" : "Sign-in" }
                </button>
            </form>
            {
                signUp ? <SignIn setUser={ setUser } /> : <SignUp signUp={ signUp } setSignUp={ setSignUp } />
            }
        </div>
    )
}

const SignUp = ({ signUp, setSignUp }) => {
    const [details, setDetails] = useState({
        name: '', username: '', pwd: ''
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        try{
            const user = await login.signUp({ name: details.name, username: details.username, password: details.pwd})
            console.log(user)           
            
        }catch(err){
            console.log(err.response.data.error)
        }

        setDetails({name: '', username: '', pwd: ''})
        alert('now, you can sign-in')
        setSignUp(!signUp)
    }

    return (
            <div className="block mt-3 md:mt-5">
                <form onSubmit={handleLoginSubmit}>
                    <InputComp title="Name" type="text" value={details.name} change={ e=> setDetails({ ...details, name: e.target.value }) }/>
                    <InputComp title="Username" type="text" value={details.username} change={ e=> setDetails({ ...details, username: e.target.value })} />
                    <InputComp title="Password" type="text" value={details.pwd} change={ e=> setDetails({ ...details, pwd: e.target.value })} />
                    <Button type="submit" content="Sign-up"/>
                </form>
            </div>
    )
}

const SignIn = ({ setUser }) => {
    const [details, setDetails] = useState({
        username: '', pwd: ''
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        try{
            const user = await login.signIn({ username: details.username, password: details.pwd})
            console.log(user)
            window.localStorage.setItem('blogUser', JSON.stringify(user))
            
            setUser(user)
            setDetails({ username: '', pwd: ''})
        }catch(err){
            alert(err.response.data.error)
        }
        
    }

    return (
            <div className="block mt-3 md:mt-5 ">
                <form onSubmit={handleLoginSubmit}>
                    <InputComp title="Username" type="text" value={details.username} change={ e=> setDetails({ ...details, username: e.target.value })} />
                    <InputComp title="Password" type="text" value={details.pwd} change={ e=> setDetails({ ...details, pwd: e.target.value })} />
                    <Button type="submit" content="Sign-in"/>
                </form>
            </div>
    )
}

const InputComp =({ title, type, value, change})=>{
    return(
        <div>
            <label className='block text-sm font-medium text-slate-700 mt-5'>{title}
                <input required type={type} value={value} onChange={change}  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 require:border-red-500'/>
            </label>
        </div>
    )
}

const Button = ({type, content}) =>{
    return(
        <button type={type} className="mt-8 w-full px-3 py-3 bg-blue-600 border border-blue-100 rounded-md outline-none text-md font-normal text-slate-50 tracking-wide">{content}</button>
    )
}

export {LoginSignUp , InputComp, Button}
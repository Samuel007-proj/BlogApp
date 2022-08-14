import React, { useState } from "react"
import  login  from "../services/login"

const LoginSignUp = ({ setUser }) => {
    const [loginState , setLoginState] = useState({signUp: true, pwdReset: false})

    const handleSigns =  (e) => {
        e.preventDefault()

        setLoginState({...loginState, signUp: !loginState.signUp})
    }
    return(
        <div className="flex flex-col m-auto w-full md:w-[55%] lg:w-[40%] max-h-[50%] md:mt-20 mb-20 md:border md:border-slate-400 rounded-lg ">
            <div className='text-left md:text-center py-7 items-baseline shadow-md bg-slate-50 md:bg-white p-3'>
                <h1 className=" text-lg text-blue-700 font-bold tracking-wide md:text-xl lg:text-3xl ">Blog App</h1>
            </div>
            
            <div className="p-3">
            <form onSubmit={ handleSigns }>
                {
                    !loginState.pwdReset 
                        ? 
                        <button type="submit" className=" border-none mt-8 w-full px-3 py-3 rounded-md outline-none text-md font-normal text-slate-700 bg-slate-100 hover:bg-slate-200 tracking-wide">
                            { loginState.signUp ? "Sign-up" : "Sign-in" }
                        </button> 
                        :
                        <div className="md:text-center text-slate-500 mt-8 font-semibold text-sm md:text-md">
                            <h4>Enter your Name, Username and a new password</h4>
                        </div> 
                }
            </form>
            {
                loginState.signUp && !loginState.pwdReset ? <SignIn loginState={loginState} setLoginState={ setLoginState } setUser={setUser} /> : <SignUp loginState={ loginState } setLoginState={ setLoginState } />
            }
            </div>
            
        </div>
    )
}

const SignUp = ({ loginState, setLoginState }) => {
    const [details, setDetails] = useState({
        name: '', username: '', pwd: ''
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault()

        let userObj = { name: details.name, username: details.username, password: details.pwd}

        try{
            let user
            if(!loginState.signUp && !loginState.pwdReset){
                //on sign up page
                user = await login.signUp(userObj)
                if(user){
                    alert('now, you can sign-in')
                    setLoginState({...loginState, signUp: !loginState.signUp})
                }
            }else if (loginState.signUp && loginState.pwdReset) {
                // form sign in page to reset password page, using sign-up page as pwd reset page
                user = await login.pwdReset(details.username, userObj)
                
                if(user){
                    alert('now, you can sign-in')
                    setLoginState({...loginState, pwdReset: !loginState.pwdReset})
                }
            }
            console.log(user)           
            setDetails({name: '', username: '', pwd: ''})
        }catch(err){
            alert(err.response.data.error)
        }

        
    }
    const btnContent = loginState.pwdReset ? "Reset password" : "Sign-up"

    return (
            <div className="block mt-3 md:mt-5 sm:mb-10">
                <form onSubmit={handleLoginSubmit}>
                    <InputComp name="name" title="Name" type="text" value={details.name} change={ e=> setDetails({ ...details, name: e.target.value }) }/>
                    <InputComp name="username" title="Username" type="text" value={details.username} change={ e=> setDetails({ ...details, username: e.target.value })} />
                    <InputComp name="password" title="Password" type="password" value={details.pwd} change={ e=> setDetails({ ...details, pwd: e.target.value })} />
                    <Button type="submit" content={btnContent} />
                </form>
            </div>
    )
}

const SignIn = ({ loginState, setLoginState, setUser }) => {
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
            <div className=" mt-3 md:mt-5 ">
                <form onSubmit={handleLoginSubmit}>
                    <InputComp name="username" title="Username" type="text" value={details.username} change={ e=> setDetails({ ...details, username: e.target.value })} />
                    <InputComp name="password" title="Password" type="password" value={details.pwd} change={ e=> setDetails({ ...details, pwd: e.target.value })} />
                    <div onClick={() => setLoginState({...loginState, pwdReset:true})}
                        className="mt-3 mr-0 ml-auto text-md font-semibold text-blue-500 w-1/2 md:w-1/3 hover:cursor-pointer ">
                        forgot password?
                    </div>
                    <Button type="submit" content="Sign-in" />
                </form>
            </div>
    )
}

const InputComp =({ name, title, type, value, change})=>{
    return(
        <div>
            <label for={name} className='block text-sm font-medium text-slate-700 mt-5'>{title}</label>
                <input required name={name} id={name} type={type} value={value} onChange={change}  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 require:border-red-500'/>
        </div>
    )
}

const Button = ({type, content}) => {
    return(
        <button type={type} className="mt-8 w-full px-3 py-3 bg-blue-600 border border-blue-100 rounded-md outline-none text-md font-bold text-slate-50 tracking-wide">{content}</button>
    )
}

export {LoginSignUp , InputComp, Button}
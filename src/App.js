import './App.css';
import { useState, useEffect } from 'react';
import { LoginSignUp } from './views/login'
import Blog from "./views/blogPage"

const App = () => {
  const [user, setUser] = useState(null)

  useEffect( ()=>{
    (async ()=> {
      let savedUser = await window.localStorage.getItem('blogUser')
      if(await savedUser){
        const activeUser = JSON.parse(savedUser)
        setUser(activeUser)
      }
    })()
    
  }, [])

  return (
    <div className="font-sans">
      {
        !user ? <LoginSignUp setUser={setUser} />: <Blog user={user} setUser={setUser}/>
      }
    </div>
  )
}

export default App;

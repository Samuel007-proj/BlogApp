import './App.css';
import { useState } from 'react';
import {Login} from './views/login'
import Blog from "./views/blogPage"

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)

  return (
    <div>
      {
        !isLoggedIn ? <Login setLog={setisLoggedIn}/> : <Blog setLog={setisLoggedIn}/>
      }
    </div>
  )
}

export default App;

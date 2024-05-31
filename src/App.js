import React, {useState, useEffect} from 'react'
import Quotes from './Quotes'
import Auth from './Auth'
import { auth } from './firebaseConfig'

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
   return unsubscribe
  }, [])
  

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className='app'>
      <header>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
     <Auth user={user} setUser={setUser}/>
      <Quotes user={user}/>
    </div>
  )
}

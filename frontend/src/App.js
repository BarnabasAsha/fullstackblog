import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import PostList from './components/PostList'
import { setToken } from './services/postservice'

function App() {
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const getToken = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <h1>Blog</h1>
      <p>This are your posts</p>
      {!user ? <Login setUser={setUser} /> : (
        <div>
          <PostList />
          <p>{user ? user.name : ''} logged-in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}


    </div>
  )
}

export default App

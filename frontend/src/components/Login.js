import React, { useState } from 'react'
import { login } from '../services/loginservice'
import { setToken } from '../services/postservice'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('user details', username, password)
    try {
      const user = await login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(e) {
      console.log(e.message)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Enter Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} aria-label="Username" name="username" required />
      <input type="password" placeholder="Enter Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" name="password" required />
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

export default Login
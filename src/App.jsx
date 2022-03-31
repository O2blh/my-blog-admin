import React from 'react'
import Admin from './pages/Admin'
import Login from './pages/Login'

import { useSelector } from 'react-redux'

function App() {
  const loginState = useSelector((state) => state.LoginState)
  return loginState.isLogined ? <Admin /> : <Login />
}

export default App

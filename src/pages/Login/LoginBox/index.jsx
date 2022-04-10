import React, { useState } from 'react'
import { auth } from '../../../network/cloudBase'
import { useDispatch } from 'react-redux'
import { VISITOR_EMAIL, VISITOR_PWD } from '../../../constants/siteInfo'
import { ACTIONS } from '../../../redux/reducers/loginState'
import { ADMIN_AVATAR } from '@/constants/siteInfo'

import './style.css'
const LoginBox = () => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const dispatch = useDispatch()
  const handleLogin = (isVistor) => {
    const user = isVistor ? VISITOR_EMAIL : email
    const password = isVistor ? VISITOR_PWD : pwd
    auth.signInWithEmailAndPassword(user, password).then((loginState) => {
      dispatch({
        type: ACTIONS.LOGIN,
        payload: loginState.user,
      })
    })
  }
  return (
    <div className="loginBox">
      <img src={ADMIN_AVATAR} className="avatar" alt="avatar" />
      <div className="emailBox">
        <div className="emailLabel">邮箱</div>
        <input
          type="text"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pwdBox">
        <div className="pwdLabel">密码</div>
        <input
          type="password"
          value={pwd}
          autoComplete="new-password"
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <div className="loginBtn" onClick={() => handleLogin(false)}>
        登录
      </div>
      <div className="visitorBtn" onClick={() => handleLogin(true)}>
        游客
      </div>
    </div>
  )
}

export default LoginBox

import React, { useState } from 'react'
import { auth } from '../../../utils/cloudBase'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/actions'
import { VISITOR_EMAIL, VISITOR_PWD } from '../../../constants/siteInfo'
import { reqSvgs } from '../../../utils/commons'

import './style.css'
const LoginBox = () => {
  const avatarUrl = reqSvgs('./tx.png')

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const dispatch = useDispatch()
  const handleLogin = (isVistor) => {
    const user = isVistor ? VISITOR_EMAIL : email
    const password = isVistor ? VISITOR_PWD : pwd
    auth.signInWithEmailAndPassword(user, password).then(() => {
      // 发送验证邮件成功
      dispatch(login(true))
    })
  }
  return (
    <div className="loginBox">
      <img src={avatarUrl} className="avatar" alt="avatar" />
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

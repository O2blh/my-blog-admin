import React from 'react'
import { HomeOutlined, LoginOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { BLOG_URL } from '../../../constants/siteInfo'
import { useDispatch } from 'react-redux'
import { ACTIONS } from '../../../redux/reducers/loginState'

import './style.css'
const Header = () => {
  const dispatch = useDispatch()
  const loginOut = () => {
    localStorage.clear()
    dispatch({
      type: ACTIONS.LOGOUT,
    })
  }
  return (
    <div className="HeaderBox">
      <a href={BLOG_URL} className="blogBtn" target="_blank" rel="noreferrer">
        <HomeOutlined />
      </a>
      <Popconfirm
        className="loginOutBtn"
        title="确定要退出登录嘛?"
        onConfirm={loginOut}
        okText="Yes"
        cancelText="No"
      >
        <LoginOutlined />
      </Popconfirm>
    </div>
  )
}

export default Header

import React from 'react'
import {
  BLOG_URL,
  ADMIN_NAME,
  SOURCE_CODE_URL,
} from '../../../constants/siteInfo'

import './style.css'
const Footer = () => {
  return (
    <div className="FooterBox">
      <div>
        博客后台管理系统 ©2021 Created by&nbsp;
        <a href={BLOG_URL} style={{ color: '#1890ff', cursor: 'pointer' }}>
          {ADMIN_NAME}
        </a>
      </div>
      <div>
        源代码&nbsp;
        <a
          style={{ color: '#1890ff' }}
          href={SOURCE_CODE_URL}
          rel="noreferrer"
          target="_blank"
        >
          [GitHub]
        </a>
      </div>
    </div>
  )
}

export default Footer

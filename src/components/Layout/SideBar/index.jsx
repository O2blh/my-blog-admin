import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ROUTES from '../../../constants/routes'
import { SITE_NAME } from '../../../constants/siteInfo'
import './style.css'

const NAVS = [
  {
    label: '首页',
    route: ROUTES.HOME,
  },
  {
    label: '文章',
    route: ROUTES.ARTICLES,
  },
  {
    label: '相册',
    route: ROUTES.GALLERY,
  },
  {
    label: '说说',
    route: ROUTES.SAY,
  },
  {
    label: '留言板',
    route: ROUTES.MSG,
  },
  {
    label: '友链',
    route: ROUTES.FRIEND_LINK,
  },
  {
    label: '作品',
    route: ROUTES.WORKS,
  },
  {
    label: '关于',
    route: ROUTES.ABOUT,
  },
  {
    label: '建站日志',
    route: ROUTES.WEBSITE_LOGS,
  },
  {
    label: '草稿箱',
    route: ROUTES.DRAFTS,
  },
]

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <div className="NavBox">
      <div className="siteName">{SITE_NAME}</div>
      <ul className="navWrapper">
        {NAVS.map((nav, index) => {
          const isActive = pathname.startsWith(nav.route)
          return (
            <li
              className={`navItem ${isActive ? 'active' : ''}`}
              key={nav.label}
            >
              <Link to={nav.route}>{nav.label}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar

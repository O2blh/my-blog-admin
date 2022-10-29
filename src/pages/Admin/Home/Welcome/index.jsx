import React from 'react'
import './style.css'
import {
  VISITOR_AVATAR,
  ADMIN_UID,
  ADMIN_NAME,
  VISITOR_NAME,
  ADMIN_AVATAR,
} from '@/constants/siteInfo'
import { auth } from '@/network/cloudBase'
import usePoem from '@/hooks/usePoem'

const Welcome = () => {
  const avatar =
    auth.currentUser?.uid === ADMIN_UID ? ADMIN_AVATAR : VISITOR_AVATAR
  const name = auth.currentUser?.uid === ADMIN_UID ? ADMIN_NAME : VISITOR_NAME

  const hour = new Date().getHours()
  const timeText =
    hour < 6
      ? '凌晨好'
      : hour < 9
      ? '早上好'
      : hour < 11
      ? '上午好'
      : hour < 13
      ? '中午好'
      : hour < 17
      ? '下午好'
      : hour < 19
      ? '傍晚好'
      : hour < 22
      ? '晚上好'
      : '夜深了'

  const [poem] = usePoem()
  return (
    <div className="welcomeBox">
      <img alt="" src={avatar} className="homeAvatar" />
      <span className="welcomeTitle">
        {timeText}, <span className="userName">{name}</span>
      </span>
      <span className="poemContent">
        {poem?.content}
        <span className="poemTitle"> —— {poem?.origin.author}</span>
      </span>
    </div>
  )
}

export default React.memo(Welcome)

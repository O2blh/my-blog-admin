import React from 'react'
import './style.css'
import usePoem from '@/hooks/usePoem'
import dayjs from 'dayjs'

const Infor = () => {
  const [poem] = usePoem()
  return (
    <div className="inforBox">
      <div className="inforDate">{dayjs().format('YYYY-MM-DD')}</div>
      <div className="inforIP">IP地址:{poem?.ipAddress}</div>
    </div>
  )
}

export default Infor

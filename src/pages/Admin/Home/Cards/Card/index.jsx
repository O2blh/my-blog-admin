import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.css'

const Card = ({ data }) => {
  return (
    <NavLink className="cardBox" to={data.route}>
      <div className="cardLabel">{data.label}</div>
      <div className="cardNumber">{data.number}</div>
    </NavLink>
  )
}

export default Card

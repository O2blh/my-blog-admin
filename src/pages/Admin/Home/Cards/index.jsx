import React from 'react'
import Card from './Card'

const Cards = (props) => {
  return (
    <>
      {props.statisticData.map((item, index) => {
        return <Card key={index} data={item} />
      })}
    </>
  )
}

export default Cards

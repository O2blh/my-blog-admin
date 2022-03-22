import React from 'react'
import { useLocation } from 'react-router-dom'

const AddArticle = () => {
  const location = useLocation()
  console.log(location)
  return <div>AddArticle</div>
}

export default AddArticle

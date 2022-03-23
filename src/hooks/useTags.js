import React from "react";
import {db} from '../utils/cloudBase'

const {useState, useEffect} = React

export default function useTags(){
  const [tagList, setTagList] = useState([])
  const getTagsFromDB = () => {
    db.collection('tag')
      .get()
      .then((res) => {
        setTagList(res.data)
      })
  }

  useEffect(() => {
    getTagsFromDB()
  }, [tagList])
  return [tagList]
}
import React from "react";
import {db} from '../utils/cloudBase'

const {useState,useEffect} = React

export default function useClassify(){
  const [classify, setClassify] = useState([])
  const getClassifyFromDB = () => {
    db.collection('classify')
      .get()
      .then((res) => {
        setClassify(res.data)
      })
  }
  useEffect(() => {
    getClassifyFromDB()
  },[])
  return [classify, getClassifyFromDB]
}
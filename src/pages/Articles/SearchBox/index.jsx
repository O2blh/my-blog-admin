import React, { useRef, useState } from 'react'

import { Button, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import ROUTES from '../../../constants/routes'

import './style.css'

const { Option } = Select

const isContained = (a, b) => {
  if (!(a instanceof Array) || !(b instanceof Array)) return false
  const len = b.length
  if (a.length < len) return false
  for (let i = 0; i < len; i++) {
    if (!a.includes(b[i])) return false
  }
  return true
}

const SearchBox = ({ articles, setArtilesShow, classifies, tags }) => {
  const history = useHistory()
  const searchWordsRef = useRef()
  const [searchClassify, setSearchClassify] = useState()
  const [searchTag, setSearchTag] = useState([])

  const turnToAddPage = () => {
    history.push(ROUTES.ADD_ARTICLE)
  }

  const searchByWords = () => {
    const keywords = searchWordsRef.current.value.toLocaleLowerCase()
    if (!keywords) {
      setArtilesShow(articles)
      return
    }
    setArtilesShow(
      articles.filter(
        (article) => article.title.toLocaleLowerCase().indexOf(keywords) !== -1
      )
    )
  }

  const searchByClassify = (value) => {
    searchWordsRef.current.value = ''
    setSearchTag([])
    if (!value) {
      setArtilesShow(articles)
      return
    }
    setArtilesShow(articles.filter((article) => article.classify === value))
  }

  const searchByTag = (tags) => {
    searchWordsRef.current.value = ''
    setSearchClassify(null)
    if (!tags || tags.length === 0) {
      setArtilesShow(articles)
      return
    }
    setArtilesShow(
      articles.filter((article) => isContained(article.tags, tags))
    )
  }

  const onSearchClassifyChange = (value) => {
    searchByClassify(value)
    setSearchClassify(value)
  }

  const onSearchTagChange = (value) => {
    console.log(value)
    setSearchTag(value)
    searchByTag(value)
  }
  return (
    <div className="searchBox">
      <Button type="primary" className="addArticleBtn" onClick={turnToAddPage}>
        写文章
      </Button>
      <input
        ref={searchWordsRef}
        className="searchInput"
        type="text"
        placeholder="请输入文章标题..."
        onChange={searchByWords}
      />
      <Select
        allowClear
        showSearch
        size="large"
        placeholder="请选择文章分类"
        className="searchClass"
        value={searchClassify}
        onChange={onSearchClassifyChange}
      >
        {classifies.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
      <Select
        allowClear
        showArrow
        showSearch
        mode="multiple"
        size="large"
        placeholder="请选择文章标签"
        className="searchTag"
        value={searchTag}
        onChange={onSearchTagChange}
      >
        {tags.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    </div>
  )
}

export default SearchBox

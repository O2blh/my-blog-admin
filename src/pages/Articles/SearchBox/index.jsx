import React, { useRef, useState } from 'react'

import { Button, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import ROUTES from '../../../constants/routes'
import { isContained } from '../../../utils/commons'

import './style.css'

const { Option } = Select

const SearchBox = ({ articles, setArtilesShow, classifies, tags }) => {
  const history = useHistory()
  const turnToAddPage = () => {
    history.push(ROUTES.ADD_ARTICLE)
  }

  const searchWordsRef = useRef()
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

  const [searchClassify, setSearchClassify] = useState()
  const searchByClassify = (value) => {
    searchWordsRef.current.value = ''
    setSearchTag([])
    if (!value) {
      setArtilesShow(articles)
      return
    }
    setArtilesShow(articles.filter((article) => article.classify === value))
  }
  const onSearchClassifyChange = (value) => {
    searchByClassify(value)
    setSearchClassify(value)
  }

  const [searchTag, setSearchTag] = useState([])
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
  const onSearchTagChange = (value) => {
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
          <Option key={item._id}>{item.classify}</Option>
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
          <Option key={item._id}>{item.tag}</Option>
        ))}
      </Select>
    </div>
  )
}

export default SearchBox

import React, { useCallback, useRef, useState } from 'react'

import { Button, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { isContained } from '@/utils/helper'

import './style.css'

const { Option } = Select

const SearchBox = ({ articles, setArtilesShow, classifies, tags }) => {
  const history = useHistory()

  //跳转到写文章页面
  const turnToAddPage = useCallback(() => {
    history.push(ROUTES.ADD_ARTICLE)
  }, [history])

  const searchWordsRef = useRef()

  //根据标题搜索文章
  const searchByWords = useCallback(() => {
    const keywords = searchWordsRef.current.value.toLocaleLowerCase()
    if (!keywords) {
      setArtilesShow(articles)
      return
    }
    setArtilesShow(
      articles.filter(
        (article) =>
          article.articleTitle.toLocaleLowerCase().indexOf(keywords) !== -1
      )
    )
  }, [articles, setArtilesShow])

  //搜索的分类
  const [searchClassify, setSearchClassify] = useState()
  //根据分类搜索
  const searchByClassify = useCallback(
    (value) => {
      searchWordsRef.current.value = ''
      setSearchTag([])
      if (!value) {
        setArtilesShow(articles)
        return
      }
      setArtilesShow(articles.filter((article) => article.classify === value))
    },
    [articles, setArtilesShow]
  )
  //搜索标签改变事件
  const onSearchClassifyChange = useCallback(
    (value) => {
      searchByClassify(value)
      setSearchClassify(value)
    },
    [searchByClassify, setSearchClassify]
  )

  //搜索的标签
  const [searchTag, setSearchTag] = useState([])
  //根据标签搜索
  const searchByTag = useCallback(
    (tags) => {
      searchWordsRef.current.value = ''
      setSearchClassify(null)
      if (!tags || tags.length === 0) {
        setArtilesShow(articles)
        return
      }
      setArtilesShow(
        articles.filter((article) => isContained(article.tags, tags))
      )
    },
    [articles, setArtilesShow]
  )
  //搜索分类改变事件
  const onSearchTagChange = useCallback(
    (value) => {
      setSearchTag(value)
      searchByTag(value)
    },
    [setSearchTag, searchByTag]
  )

  return (
    <div className="searchBox">
      <Button type="primary" onClick={turnToAddPage}>
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
          <Option key={item.classify}>{item.classify}</Option>
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
          <Option key={item.tag}>{item.tag}</Option>
        ))}
      </Select>
    </div>
  )
}

export default SearchBox

import React, { useRef, useState, useEffect, useMemo, useReducer } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { message } from 'antd'
import { _createDraft, _getDraftById, _updateDraft } from '@/network/drafts'
import useUrlState from '@ahooksjs/use-url-state'
import { parshQueryString, debounce } from '@/utils/helper'
import { marked } from 'marked'
import hljs from 'highlight.js'
import '@/style/github-dark.css'
import './style.css'
import InputRegion from './InputRegion'
import PreviewRegion from './PreviewRegion'
import RightBox from './RightBox'
import ArticleTitle from './ArticleTitle'

const initialState = {
  draftId: '', // 草稿id
  articleTitle: '', // 文章标题
  articleContent: '', // 文章内容
  markdownContent: '', // markdown显示内容
  tags: [], // 文章标签
  classify: '', // 文章分类
  defaultClassify: '', //原先的文章分类
  abstract: '', // 文章概要
  abstractLength: 0,
  isPublished: false, //是否已发布
  publishId: '', //已发布的文章ID
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const AddArticle = () => {
  const location = useLocation()
  const history = useHistory()
  const queryObj = useMemo(() => {
    return parshQueryString(location.search)
  }, [location.search])

  const [isMounted, setIsMounted] = useState(false)

  const [urlState, setUrlState] = useUrlState(queryObj)
  const [state, dispatch] = useReducer(reducer, initialState)

  const { draftId, articleTitle, articleContent, tags, classify, abstract } =
    state

  //自动保存提示信息
  const [autoSaveMsg, setAutoSaveMsg] = useState('文章将自动保存至草稿箱')

  // 配置highlight
  hljs.configure({
    tabReplace: '',
    classPrefix: 'hljs-',
    languages: [
      'CSS',
      'HTML',
      'JavaScript',
      'Python',
      'TypeScript',
      'Markdown',
    ],
  })
  // 配置marked
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => hljs.highlightAuto(code).value,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  })

  //获取草稿
  const getDraftById = async (draftId) => {
    const res = await _getDraftById(draftId)
    if (!res || res.length === 0) {
      message.warning('文章不存在')
      setTimeout(() => {
        history.push(ROUTES.ARTICLES)
      }, 1000)
      return
    }
    const data = res[0]
    const mkd = marked(data.articleContent)
    const draft = {
      draftId: data._id,
      articleTitle: data.articleTitle,
      articleContent: data.articleContent,
      markdownContent: mkd,
      classify: data.classify,
      defaultClassify: data.classify,
      tags: data.tags,
      abstract: data.abstract,
      abstractLength: data.abstract.length,
      isPublished: data.isPublished,
      publishId: data.publishId,
    }
    dispatch({
      type: 'update',
      payload: draft,
    })
    setIsMounted(true)
  }

  //如果是编辑,获取草稿数据
  useEffect(() => {
    if (urlState.draftId) {
      getDraftById(urlState.draftId)
    } else {
      setIsMounted(true)
    }
  }, [])

  //保存文章到草稿箱
  const saveArticleToDrafts = async (draftId, article) => {
    if (draftId) {
      setAutoSaveMsg('保存中...')
      const res = await _updateDraft(draftId, {
        ...article,
        modifyDate: Date.now(),
      })
      if (res) {
        setAutoSaveMsg('保存成功')
      }
    } else {
      setAutoSaveMsg('保存中...')
      const res = await _createDraft({
        ...article,
        isPublished: false,
        publishId: '',
        modifyDate: Date.now(),
      })
      if (res) {
        dispatch({
          type: 'update',
          payload: {
            draftId: res.id,
          },
        })
        setUrlState({
          ...urlState,
          draftId: res.id,
        })
        setAutoSaveMsg('保存成功')
      }
    }
  }

  //使用useMemo保证保证每次获取的都是防抖之后的函数
  const debounceSaveArticleToDrafts = useMemo(
    () => debounce(saveArticleToDrafts, 1000),
    []
  )

  //当内容改变后，使用副作用将内容自动保存到草稿箱
  useEffect(() => {
    if (!isMounted) {
      return
    }
    if (!articleTitle && !articleContent) {
      return
    }
    debounceSaveArticleToDrafts(draftId, {
      articleTitle,
      articleContent,
      tags,
      classify,
      abstract,
    })
  }, [draftId, articleTitle, articleContent, tags, classify, abstract])

  const mkdRegionRef = useRef()
  //预览区同步滚动
  const onScrollEvent = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    //输入区可滚动的高度 = 元素总高度 - 显示区高度
    const inputRegionCanScrollHeight = scrollHeight - clientHeight
    //预览区可滚动的高度 = 元素总高度 - 显示区高度
    const showRegionCanScrollHeight =
      mkdRegionRef.current.scrollHeight - mkdRegionRef.current.clientHeight
    // 滚动位置 =  (已滚动的高度/可滚动的高度) * 预览区可滚动的高度
    const posY = Math.round(
      (scrollTop / inputRegionCanScrollHeight) * showRegionCanScrollHeight
    )
    mkdRegionRef.current.scrollTop = posY
  }

  const debounceScrollEvent = useMemo(() => debounce(onScrollEvent, 10), [])

  return (
    <div className="articleBox">
      <div className="articleTitleBox">
        <ArticleTitle state={state} dispatch={dispatch} />
        <RightBox autoSaveMsg={autoSaveMsg} state={state} dispatch={dispatch} />
      </div>
      <div className="editBox">
        <InputRegion
          state={state}
          dispatch={dispatch}
          debounceScrollEvent={debounceScrollEvent}
        />
        <PreviewRegion ref={mkdRegionRef} state={state} />
      </div>
    </div>
  )
}

export default AddArticle

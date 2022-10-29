import { parshQueryString } from '@/utils/helper'
import React, { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import ROUTES from '@/constants/routes'
import { Input } from 'antd'
import { _getAbout, _updateAbout } from '@/network/about'
import { debounce } from '@/utils/helper'
import { marked } from 'marked'
import hljs from 'highlight.js'
import '@/style/github-dark.css'
import './style.css'

const { TextArea } = Input

const AboutEdit = () => {
  const history = useHistory()
  const location = useLocation()
  const queryObject = parshQueryString(location.search)

  const [id, setId] = useState('')
  const [type, setType] = useState(Number(queryObject.isMe))
  const [content, setContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('') // markdown显示内容
  const aboutTitle = type === 1 ? '关于我' : '关于本站'

  //从数据库获取数据
  const getAboutFromDb = async (type) => {
    const res = await _getAbout(type)
    if (res && res.length) {
      console.log(res)
      setId(res[0]._id)
      setContent(res[0].content)
      const mkd = marked(res[0].content)
      setMarkdownContent(mkd)
    }
  }

  useEffect(() => {
    getAboutFromDb(type)
  }, [])

  //跳转到关于页面
  const turnToAboutPage = () => {
    history.push(ROUTES.ABOUT)
  }

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

  //自动保存到数据库
  const autoSaveContent = useMemo(()=>{
    return async (content) => {
      if (id) {
        const res = await _updateAbout(id, {
          type,
          content,
          modifyDate: Date.now(),
        })
        console.log(res)
      }
    }
  },[id, type])

  //使用useMemo保证保证每次获取的都是防抖之后的函数
  const debounceAutoSaveContent = useMemo(
    () => debounce(autoSaveContent, 1000),
    [autoSaveContent]
  )

  useEffect(() => {
    debounceAutoSaveContent(content)
  }, [content, debounceAutoSaveContent])


  return (
    <div className="aboutEditBox">
      <div className="aboutTitle">
        <div className="editBtn" onClick={turnToAboutPage}>
          返回
        </div>
        <span className="aboutTitleDesc">{aboutTitle}</span>
      </div>
      <div className="editBox">
        <TextArea
          className="inputRegion"
          onChange={(e) => {
            setContent(e.target.value)
            const mkd = marked(e.target.value)
            setMarkdownContent(mkd)
          }}
          value={content}
        ></TextArea>
        <div
          className="showRegion markdownStyle"
          dangerouslySetInnerHTML={{
            __html: markdownContent.replace(/<pre>/g, "<pre id='hljs'>"),
          }}
        ></div>
      </div>
    </div>
  )
}

export default AboutEdit

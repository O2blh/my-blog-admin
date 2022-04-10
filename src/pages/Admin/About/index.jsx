import React, { useEffect, useState } from 'react'
import { FormOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ROUTES from '@/constants/routes'
import { _getAbout } from '@/network/about'
import { marked } from 'marked'
import hljs from 'highlight.js'
import './style.css'

const About = () => {
  const history = useHistory()
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

  const [aboutMeMarkdownContent, setAboutMeMarkdownContent] = useState('')
  const [aboutSiteMarkdownContent, setAboutSiteMarkdownContent] = useState('')
  //从数据库获取数据
  const getAboutFromDb = async (type) => {
    const res = await _getAbout(type)
    if (res && res.length) {
      if (type === 0) {
        const mkd = marked(res[0].content)
        setAboutSiteMarkdownContent(mkd)
      } else if (type === 1) {
        const mkd = marked(res[0].content)
        setAboutMeMarkdownContent(mkd)
      }
    }
  }
  useEffect(() => {
    getAboutFromDb(0)
    getAboutFromDb(1)
  }, [])

  const turnToEditPage = (isMe) => {
    history.push(`${ROUTES.ABOUT_EDIT}?isMe=${isMe}`)
  }
  return (
    <div className="aboutBox">
      <div className="aboutMe">
        <div className="aboutTitle">
          <div className="editBtn" onClick={() => turnToEditPage(1)}>
            <FormOutlined />
          </div>
          <span className="aboutTitleDesc">关于我</span>
        </div>
        <div
          className="aboutContent"
          dangerouslySetInnerHTML={{
            __html: aboutMeMarkdownContent.replace(/<pre>/g, "<pre id='hljs'>"),
          }}
        ></div>
      </div>
      <div className="aboutSite">
        <div className="aboutTitle">
          <div className="editBtn" onClick={() => turnToEditPage(0)}>
            <FormOutlined />
          </div>
          <span className="aboutTitleDesc">关于本站</span>
        </div>
        <div
          className="aboutContent"
          dangerouslySetInnerHTML={{
            __html: aboutSiteMarkdownContent.replace(
              /<pre>/g,
              "<pre id='hljs'>"
            ),
          }}
        ></div>
      </div>
    </div>
  )
}

export default About

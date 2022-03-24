import React, { useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ROUTES from '../../constants/routes'
import useClickAway from '../../hooks/useClickAway'
import { Input, Select } from 'antd'
import { marked } from 'marked'
import hljs from 'highlight.js'
import './github-dark.css'
import './style.css'
import { useClassify } from '../../hooks'

const { TextArea } = Input
const { Option } = Select

const AddArticle = () => {
  const location = useLocation()
  const history = useHistory()
  console.log(location)

  const [articleId, setArticleId] = useState('') // 文章id
  const [articleTitle, setArticleTitle] = useState('') // 文章标题
  const [articleContent, setArticleContent] = useState('') // 文章内容
  const [markdownContent, setMarkdownContent] = useState('') // markdown显示内容
  const [publishDate, setPUblishDate] = useState('') // 发布日期
  const [tags, setTags] = useState([]) // 文章标签
  const [classify, setClassify] = useState('') // 文章分类
  const [abstract, setAbstract] = useState('') // 文章概要

  const [defaultarticleContent, setDefaultArticleContent] = useState('') // 文章的默认显示内容

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
    gfm: true, //默认为true。 允许 Git Hub标准的markdown.
    tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
  })

  // 显示发布弹框
  const [isShowPublishBox, setIsShowPublishBox] = useState(false)
  const publishBoxRef = useRef()
  useClickAway(publishBoxRef, () => {
    setIsShowPublishBox(false)
  })

  //
  const [classifies] = useClassify()

  return (
    <div className="articleBox">
      <div className="articleTitleBox">
        <input
          className="articleTitle"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          placeholder="请输入文章标题..."
        />
        <div className="rightBox">
          {/* <div className=''>文章将自动保存至草稿箱</div> */}
          <button
            className="draftsBtn"
            onClick={() => history.push(ROUTES.DRAFTS)}
          >
            草稿箱
          </button>
          <div className="publishBox">
            <button
              type="primary"
              className="publishBtn"
              onClick={() => {
                setIsShowPublishBox(!isShowPublishBox)
              }}
            >
              发布
            </button>
            <div
              ref={publishBoxRef}
              className="publishContent"
              style={{ display: isShowPublishBox ? 'block' : 'none' }}
            >
              <div className="fromTitle">发布文章</div>
              <div className="formItem">
                <div className="formItemLabel require">分类:</div>
                <div className="formItemContent">
                  <Select
                    placeholder="请选择文章分类"
                    onChange={(value) => setClassify(value)}
                  >
                    {classifies.map((item) => {
                      return (
                        <Option key={item._id} value={item._id}>
                          {item.classify}
                        </Option>
                      )
                    })}
                  </Select>
                </div>
              </div>
              <div className="formItem">
                <div className="formItemLabel require">分类:</div>
                <div className="formItemContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="editBox">
        <TextArea
          className="inputRegion"
          onChange={(e) => {
            console.log(e.target.value)
            setArticleContent(e.target.value)
            const mkd = marked(e.target.value)
            setMarkdownContent(mkd)
          }}
        >
          {defaultarticleContent}
        </TextArea>
        <div
          className="showRegion"
          dangerouslySetInnerHTML={{
            __html: markdownContent.replace(/<pre>/g, "<pre id='hljs'>"),
          }}
        ></div>
      </div>
    </div>
  )
}

export default AddArticle

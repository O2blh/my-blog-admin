import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ROUTES from '../../constants/routes'
import useClickAway from '../../hooks/useClickAway'
import { Input, Select, message } from 'antd'
import { auth } from '../../network/cloudBase'
import {
  _updateArtilce,
  _createArtilce,
  _getArtilceById,
} from '../../network/article'
import { classMinOne, classPlusOne } from '../../network/classify'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'
import { useClassify, useTags } from '../../hooks'
import { parshQueryString } from '../../utils/helper'
import { marked } from 'marked'
import hljs from 'highlight.js'
import './github-dark.css'
import './style.css'
const { TextArea } = Input
const { Option } = Select

const AddArticle = () => {
  const location = useLocation()
  const history = useHistory()
  const queryObj = parshQueryString(location.search)

  const [articleId, setArticleId] = useState('') // 文章id
  const [articleTitle, setArticleTitle] = useState('') // 文章标题
  const [articleContent, setArticleContent] = useState('') // 文章内容
  const [markdownContent, setMarkdownContent] = useState('') // markdown显示内容
  // const [publishDate, setPUblishDate] = useState('') // 发布日期
  const [tags, setTags] = useState([]) // 文章标签
  const [classify, setClassify] = useState('') // 文章分类
  const [abstract, setAbstract] = useState('') // 文章概要
  const [abstractLength, setAbstractLength] = useState(0)

  const [defaultClassify, setDefaultClassify] = useState('')

  const getArticleById = async () => {
    if (queryObj.articleId) {
      const res = await _getArtilceById(queryObj.articleId)
      console.log(res)
      if (!res || res.length === 0) {
        message.warning('文章不存在')
        setTimeout(() => {
          history.push(ROUTES.ARTICLES)
        }, 1000)
        return
      }
      const data = res[0]
      setArticleId(data._id)
      setArticleTitle(data.articleTitle)
      setArticleContent(data.articleContent)
      setMarkdownContent(data.articleContent)
      setClassify(data.classify)
      setDefaultClassify(data.classify)
      setTags(data.tags)
      setAbstract(data.abstract)
      setAbstractLength(data.abstract.length)
    }
  }

  useEffect(() => {
    getArticleById()
  }, [])

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
  useClickAway(publishBoxRef, (event) => {
    //使用antd的Select下拉框会在body下挂载一个dropdown元素，点击dropdown时，这个事件不是从内部触发，这会导致隐藏发布文章的合资，判断一下事件来源是不是从生成的dropdown内部传出来的，如果是，不做任何操作
    if (!document.getElementById('root').contains(event.target)) {
      return
    }
    setIsShowPublishBox(false)
  })

  //文章分类数据
  const [classifies] = useClassify()
  //文章标签数据
  const [tagList] = useTags()

  const createOrUpdateArticle = async () => {
    if (!articleTitle) {
      message.info('请输入文章标题！')
      return
    }
    if (!classify) {
      message.info('请选择文章分类！')
      return
    }
    if (!tags || tags.length < 1) {
      message.info('请添加文章标签！')
      return
    }
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }

    if (articleId) {
      const res = _updateArtilce(articleId, {
        articleTitle,
        articleContent,
        modifyDate: Date.now(),
        tags,
        classify,
        abstract,
      })
      if (res) {
        //修改了文章分类
        if (defaultClassify && defaultClassify !== classify) {
          classMinOne(defaultClassify)
          classPlusOne(classify)
        }
        message.success('更新成功!')
        setTimeout(() => {
          history.push(ROUTES.ARTICLES)
        }, 1000)
      }
    } else {
      const res = _createArtilce({
        articleTitle,
        articleContent,
        publishDate: Date.now(),
        modifyDate: Date.now(),
        tags,
        classify,
        abstract,
      })
      if (res) {
        classPlusOne(classify)
        message.success('发布成功!')
        setTimeout(() => {
          history.push(ROUTES.ARTICLES)
        }, 1000)
      }
    }
  }

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
            className="commonBtn draftsBtn"
            onClick={() => history.push(ROUTES.DRAFTS)}
          >
            草稿箱
          </button>
          <div className="publishBox">
            <button
              className="primaryBtn publishBtn"
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
                    allowClear
                    placeholder="请选择文章分类"
                    onChange={(value) => setClassify(value)}
                    value={classify}
                  >
                    {classifies.map((item) => {
                      return (
                        <Option key={item.classify} value={item.classify}>
                          {item.classify}
                        </Option>
                      )
                    })}
                  </Select>
                </div>
              </div>
              <div className="formItem">
                <div className="formItemLabel require">添加标签:</div>
                <div className="formItemContent">
                  <Select
                    mode="tags"
                    allowClear
                    placeholder="请选择文章标签"
                    onChange={(value) => setTags(value)}
                    value={tags}
                  >
                    {tagList.map((item) => {
                      return (
                        <Option key={item.tag} value={item.tag}>
                          {item.tag}
                        </Option>
                      )
                    })}
                  </Select>
                </div>
              </div>
              <div className="formItem">
                <div className="formItemLabel require">编辑摘要:</div>
                <div className="formItemContent">
                  <div className="abstract">
                    <TextArea
                      className="abstractContent"
                      rows={5}
                      maxLength={100}
                      onChange={(e) => {
                        setAbstract(e.target.value)
                        setAbstractLength(e.target.value.length)
                      }}
                      value={abstract}
                    ></TextArea>
                    <span
                      className="abstractLength"
                      style={{ color: abstractLength > 50 ? '#9e9e9e' : 'red' }}
                    >
                      {abstractLength}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="formItem formBtn">
                <button
                  className="commonBtn"
                  onClick={() => setIsShowPublishBox(false)}
                >
                  取消
                </button>
                <button
                  className="primaryBtn"
                  style={{ marginLeft: '20px' }}
                  onClick={createOrUpdateArticle}
                >
                  确定并发布
                </button>
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
          value={articleContent}
        ></TextArea>
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

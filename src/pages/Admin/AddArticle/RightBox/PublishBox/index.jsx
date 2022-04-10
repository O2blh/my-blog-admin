import React, { useRef } from 'react'
import { Input, Select, message } from 'antd'
import { useClassify, useTag } from '@/hooks'
import useClickAway from '@/hooks/useClickAway'
import { auth } from '@/network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '@/constants/siteInfo'
import { _updateArtilce, _createArtilce } from '@/network/article'
import { classMinOne, classPlusOne } from '@/network/classify'
import ROUTES from '@/constants/routes'
import { useHistory } from 'react-router-dom'
import { _updateDraft } from '@/network/drafts'

import './style.css'
const { TextArea } = Input
const { Option } = Select

const PublishBox = ({
  isShowPublishBox,
  setIsShowPublishBox,
  state,
  dispatch,
}) => {
  //文章分类数据
  const [classifies] = useClassify()
  //文章标签数据
  const [tagList] = useTag()
  const {
    draftId,
    articleTitle,
    articleContent,
    tags,
    classify,
    defaultClassify,
    abstract,
    abstractLength,
    isPublished,
    publishId,
  } = state

  const history = useHistory()
  const publishBoxRef = useRef()

  //在发布弹框以外点击，隐藏发布框
  useClickAway(publishBoxRef, (event) => {
    //使用antd的Select下拉框会在body下挂载一个dropdown元素，点击dropdown时，这个事件不是从内部触发，这会导致隐藏发布文章的合资，判断一下事件来源是不是从生成的dropdown内部传出来的，如果是，不做任何操作
    if (!document.getElementById('root').contains(event.target)) {
      return
    }
    setIsShowPublishBox(false)
  })

  //发布或更新文章
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
    if (isPublished) {
      const res = await _updateArtilce(publishId, {
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
      const res = await _createArtilce({
        articleTitle,
        articleContent,
        publishDate: Date.now(),
        modifyDate: Date.now(),
        tags,
        classify,
        abstract,
        draftId,
      })
      if (res) {
        message.success('发布成功!')
        classPlusOne(classify)
        _updateDraft(draftId, {
          isPublished: true,
          publishId: res.id,
        })
        setTimeout(() => {
          history.push(ROUTES.ARTICLES)
        }, 1000)
      }
    }
  }

  return (
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
            onChange={(value) => {
              dispatch({ type: 'update', payload: { classify: value } })
            }}
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
            onChange={(value) => {
              dispatch({ type: 'update', payload: { tags: value } })
            }}
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
                dispatch({
                  type: 'update',
                  payload: {
                    abstract: e.target.value,
                    abstractLength: e.target.value.length,
                  },
                })
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
  )
}

export default PublishBox

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Button, message, Popconfirm, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { _createTag, _deleteTag, _updateTag } from '@/network/tag'
import './style.css'
import { useTag } from '@/hooks'

const Tags = () => {
  const inputRef = useRef()
  const tagColor = useMemo(() => {
    return [
      'rgb(236, 17, 17)',
      'rgb(236, 141, 17)',
      'rgb(177, 174, 11)',
      'rgb(116, 115, 109)',
      'rgb(77, 75, 65)',
      'rgb(35, 207, 50)',
      'rgb(38, 204, 162)',
      'rgb(11, 156, 120)',
      'rgb(4, 187, 211)',
      'rgb(7, 133, 206)',
      'rgb(7, 64, 151)',
      'rgb(9, 24, 235)',
      'rgb(157, 160, 212)',
      'rgb(144, 76, 235)',
      'rgb(209, 76, 235)',
      'rgb(224, 19, 224)',
      'rgb(238, 45, 126)',
      'rgb(253, 48, 65)',
      '#f50',
      '#2db7f5',
      '#87d068',
      '#108ee9',
    ]
  }, [])

  const colorLen = tagColor.length

  const [tagList, getTagsFromDB] = useTag()

  //创建标签
  const createTag = async () => {
    const newtTag = inputRef.current.value
    if (!newtTag) {
      message.warning('标签不可以为空!')
      return
    }
    if (tagList.find((tag) => tag.tag === newtTag)) {
      message.warning('标签已存在!')
      return
    }
    const res = await _createTag({
      tag: newtTag,
    })
    if (res) {
      inputRef.current.value = ''
      message.success('创建成功!')
      getTagsFromDB()
    }
  }

  //删除标签
  const deleteTag = async (item) => {
    const res = await _deleteTag(item._id)
    if (res) {
      message.success('删除成功')
      getTagsFromDB()
    }
  }

  //编辑标签
  const editTag = async () => {
    if (!editName) {
      message.warning('标签不可以为空!')
      return
    }
    if (tagList.find((tag) => tag.tag === editName)) {
      message.warning('标签已存在!')
      return
    }
    const res = await _updateTag(editId, {
      tag: editName,
    })
    if (res) {
      message.success('更新成功!')
      cancelEditModal()
      getTagsFromDB()
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false) //弹框状态(显示/隐藏)
  const [editId, setEdidId] = useState(null) //编辑中的tagId
  const [editName, setEditName] = useState(null) //编辑中的tag名

  //打开编辑弹框
  const showEditModal = useCallback((item) => {
    setEdidId(item._id)
    setEditName(item.tag)
    setIsModalVisible(true)
  }, [])

  //关闭编辑弹框
  const cancelEditModal = useCallback(() => {
    setEdidId(null)
    setEditName(null)
    setIsModalVisible(false)
  }, [])

  return (
    <div className="tagBox">
      <div className="tagTitle">标签</div>
      <div className="tagCreateBox">
        <input
          className="tagCreateInput"
          type="text"
          ref={inputRef}
          placeholder="请输入新的分类..."
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              createTag()
            }
          }}
        />
        <Button className="tagCreateBtn" type="primary" onClick={createTag}>
          新建
        </Button>
      </div>
      <div className="tagList">
        {tagList.map((item, index) => {
          return (
            <span
              className="theTag"
              style={{ backgroundColor: tagColor[(index + 1) % colorLen] }}
              key={item._id}
              onDoubleClick={() => showEditModal(item)}
            >
              {item.tag}
              <Popconfirm
                placement="top"
                title="确定要删除该分类吗？"
                onConfirm={() => deleteTag(item)}
                okText="Yes"
                cancelText="No"
              >
                <CloseOutlined className="deleteTagBtn" />
              </Popconfirm>
            </span>
          )
        })}
      </div>
      <Modal
        title="编辑分类"
        visible={isModalVisible}
        centered
        onOk={editTag}
        onCancel={cancelEditModal}
        width={400}
        okText="确认"
        cancelText="取消"
      >
        <input
          className="editClassifyInput"
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              editTag()
            }
          }}
        />
      </Modal>
    </div>
  )
}

export default React.memo(Tags)

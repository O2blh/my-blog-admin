import React, { useEffect, useRef, useState } from 'react'
import { Button, List, message, Popconfirm, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { db } from '../../../utils/cloudBase'
import useClassify from '../../../hooks/useClassify'

import './style.css'

const Classify = () => {
  const inputRef = useRef()

  const [classify, getTagsFromDB] = useClassify()

  const editCalssify = () => {
    if (!editingCalssify) {
      message.warning('分类名不能为空!')
      return
    }
    if (classify.find((item) => item.classify === editingCalssify)) {
      message.warning('分类名已存在!')
      return
    }
    db.collection('classify')
      .doc(editingCalssifyId)
      .update({
        classify: editingCalssify,
      })
      .then((res) => {
        getTagsFromDB()
        message.success('更新成功!')
        cancleEdit()
      })
  }

  const deleteClass = (classify) => {
    db.collection('classify')
      .doc(classify._id)
      .remove()
      .then((res) => {
        getTagsFromDB()
        message.success('删除成功')
      })
  }

  const addClassify = () => {
    const newClassify = inputRef.current.value
    if (!newClassify) {
      message.info('分类名不能为空!')
      return
    }
    if (classify.find((item) => item.classify === newClassify)) {
      message.warning('分类名已存在!')
      return
    }
    db.collection('classify')
      .add({
        classify: newClassify,
        count: 0,
      })
      .then((res) => {
        getTagsFromDB()
        inputRef.current.value = ''
        message.success('添加成功!')
      })
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCalssifyId, setEditingCalssifyId] = useState(null)
  const [editingCalssify, setEditingCalssify] = useState(null)

  const openEditModal = (editItem) => {
    setEditingCalssify(editItem.classify)
    setEditingCalssifyId(editItem._id)
    setIsModalVisible(true)
  }

  const cancleEdit = () => {
    setEditingCalssify(null)
    setEditingCalssifyId(null)
    setIsModalVisible(false)
  }
  return (
    <div className="classifyBox">
      <div className="classifyTitle">分类</div>
      <div className="classifyCreateBox">
        <input
          className="classCreateInput"
          type="text"
          ref={inputRef}
          placeholder="请输入新的分类..."
        />
        <Button className="classCreateBtn" type="primary" onClick={addClassify}>
          新建
        </Button>
      </div>
      <div className="classifyList">
        <List
          itemLayout="horizontal"
          dataSource={classify}
          renderItem={(item) => (
            <List.Item>
              <span className="articlesNum">{item.count}</span>
              <span
                className="classifyName"
                onDoubleClick={() => openEditModal(item)}
              >
                《{item.classify}》
              </span>
              <EditOutlined
                className="classesEdit"
                onClick={() => openEditModal(item)}
              />
              <Popconfirm
                placement="top"
                title="确定要删除该分类吗？"
                onConfirm={() => deleteClass(item)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="classesDelete" />
              </Popconfirm>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="编辑分类"
        visible={isModalVisible}
        centered
        onOk={editCalssify}
        onCancel={cancleEdit}
        width={400}
        okText="确认"
        cancelText="取消"
      >
        <input
          className="editClassifyInput"
          type="text"
          value={editingCalssify}
          onChange={(e) => setEditingCalssify(e.target.value)}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              editCalssify()
            }
          }}
        />
      </Modal>
    </div>
  )
}

export default Classify

import React, { useRef, useState } from 'react'
import { Button, List, message, Popconfirm, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  _updateClassify,
  _deleteClassify,
  _createClassify,
} from '@/network/classify'
import useClassify from '@/hooks/useClassify'

import './style.css'

const Classify = () => {
  const inputRef = useRef()

  const [classify, getClassifyFromDB] = useClassify()

  const editCalssify = async () => {
    if (!editingCalssify) {
      message.warning('分类名不能为空!')
      return
    }
    if (classify.find((item) => item.classify === editingCalssify)) {
      message.warning('分类名已存在!')
      return
    }

    const res = await _updateClassify(editingCalssifyId, {
      classify: editingCalssify,
    })
    if (res) {
      message.success('更新成功!')
      getClassifyFromDB()
      cancleEdit()
    }
  }

  const deleteClass = async (classify) => {
    const res = await _deleteClassify(classify._id)
    if (res) {
      message.success('删除成功')
      getClassifyFromDB()
    }
  }

  const addClassify = async () => {
    const newClassify = inputRef.current.value
    if (!newClassify) {
      message.info('分类名不能为空!')
      return
    }
    if (classify.find((item) => item.classify === newClassify)) {
      message.warning('分类名已存在!')
      return
    }
    const res = await _createClassify({
      classify: newClassify,
      count: 0,
    })
    if (res) {
      getClassifyFromDB()
      inputRef.current.value = ''
      message.success('添加成功!')
    }
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

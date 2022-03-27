import React, { useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Space,
  Popconfirm,
  Popover,
} from 'antd'
import { _createsay } from '../../network/say'
import useSay from '../../hooks/useSay'
import { auth } from '../../network/cloudBase'
import { _deletesay } from '../../network/say'
import { classMinOne } from '../../network/classify'
import {
  ADMIN_UID,
  VISITOR_TEXT,
  emojiPeople,
  emojiNature,
  emojiObj,
  emojiPlace,
  emojiSymbol,
} from '../../constants/siteInfo'
import dayjs from 'dayjs'

import './style.css'

const { TextArea } = Input

const Say = () => {
  const [sayList, getSayFromDB] = useSay()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sayContent, setSayContent] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)

  const createOrUpdateSay = async () => {
    if (editId) {
    }
    const res = await _createsay({
      content: sayContent,
      publishDate: Date.now(),
    })
    if (res) {
      message.success('发布说说成功')
    }
  }

  const deleteSay = async (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = await _deletesay(id)
    if (res) {
      message.warning('删除成功')
      getSayFromDB()
    }
  }

  const createSay = (say) => {
    setIsEdit(false)
    setEditId(null)
    setSayContent('')
    setIsModalVisible(true)
  }

  const editSay = (say) => {
    setIsEdit(true)
    setEditId(say._id)
    setSayContent(say.content)
    setIsModalVisible(true)
  }

  const cancelEdit = () => {
    setIsEdit(false)
    setEditId(null)
    setSayContent('')
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: '说说内容',
      dataIndex: 'content',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: '_id',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: '_id',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editSay(record._id)}>
            修改
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该说说吗？"
            onConfirm={() => {
              if (auth.currentUser.uid !== ADMIN_UID) {
                message.warning(VISITOR_TEXT)
                return
              }
              deleteSay(record._id)
              classMinOne(record.classify)
            }}
            okText="Yes"
            cancelText="No"
            overlayStyle={{ width: '200px' }}
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="searchBox">
        <Button type="primary" onClick={createSay}>
          新建
        </Button>
      </div>
      <Modal
        title={isEdit ? '发布说说' : '更新说说'}
        visible={isModalVisible}
        centered
        onOk={createOrUpdateSay}
        onCancel={cancelEdit}
        width={400}
        okText="确认"
        cancelText="取消"
      >
        <TextArea
          rows={5}
          onInput={(e) => {
            setSayContent(e.target.value)
          }}
          value={sayContent}
        ></TextArea>
        <div className="emojBox">
          <Popover
            className="emojiBtn"
            overlayClassName="emojiContent"
            placement="bottom"
            content={emojiPeople}
            trigger="click"
          >
            <Button>😄</Button>
          </Popover>
          <Popover
            className="emojiBtn"
            overlayClassName="emojiContent"
            placement="bottom"
            content={emojiNature}
            trigger="click"
          >
            <Button>☀️</Button>
          </Popover>
          <Popover
            className="emojiBtn"
            overlayClassName="emojiContent"
            placement="bottom"
            content={emojiObj}
            trigger="click"
          >
            <Button>🏀</Button>
          </Popover>
          <Popover
            className="emojiBtn"
            overlayClassName="emojiContent"
            placement="bottom"
            content={emojiPlace}
            trigger="click"
          >
            <Button>⛪</Button>
          </Popover>
          <Popover
            className="emojiBtn"
            overlayClassName="emojiContent"
            placement="bottom"
            content={emojiSymbol}
            trigger="click"
          >
            <Button>🆗</Button>
          </Popover>
        </div>
      </Modal>
      <Table
        columns={columns}
        dataSource={sayList}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: false,
          showQuickJumper: true,
        }}
      />
    </>
  )
}

export default Say

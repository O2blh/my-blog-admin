import React, { useState } from 'react'
import { Table, Button, Modal, Input, message, Space, Popconfirm } from 'antd'
import { useSiteLog } from '@/hooks'
import {
  _createSiteLog,
  _deleteSiteLog,
  _updateSiteLog,
} from '@/network/siteLog'
import { auth } from '@/network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '@/constants/siteInfo'
import dayjs from '@/components/dayjs'
// import dayjs from 'dayjs'
import Emoji from '@/components/Emoji'
import { DatePicker } from 'antd'

import './style.css'

const { TextArea } = Input

const WebSiteLogs = () => {
  const [siteLog, getSiteLogDB] = useSiteLog()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [content, setContent] = useState('')
  const [logDate, setLogDate] = useState(dayjs().format('YYYY-MM-DD'))

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)

  //创建或更新日志
  const createOrUpdateLog = async () => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }

    if (!content) {
      message.warning('内容不可以为空哦~~~')
      return
    }

    if (editId) {
      const res = await _updateSiteLog(editId, {
        content,
        logDate,
      })
      if (res) {
        message.success('更新成功')
        getSiteLogDB()
        cancelEditModal()
      }
    } else {
      const res = await _createSiteLog({
        content,
        logDate,
      })
      if (res) {
        message.success('创建成功')
        getSiteLogDB()
        cancelEditModal()
      }
    }
  }

  //删除日志
  const deleteLog = async (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = await _deleteSiteLog(id)
    if (res) {
      message.warning('删除成功')
      getSiteLogDB()
    }
  }

  //打开创建弹出
  const openCreateModal = () => {
    setIsEdit(false)
    setEditId(null)
    setContent('')
    setLogDate(dayjs().format('YYYY-MM-DD'))
    setIsModalVisible(true)
  }

  //打开更新弹窗
  const openEditModal = (log) => {
    setIsEdit(true)
    setEditId(log._id)
    setContent(log.content)
    setLogDate(log.logDate)
    setIsModalVisible(true)
  }

  //关闭弹窗
  const cancelEditModal = () => {
    setIsEdit(false)
    setEditId(null)
    setContent('')
    setLogDate('')
    setIsModalVisible(false)
  }

  const emojiClickCallback = (emoji) => {
    setContent(content + emoji)
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'logDate',
      key: '_id',
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '操作',
      key: '_id',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditModal(record)}>
            修改
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该日志吗？"
            onConfirm={() => {
              deleteLog(record._id)
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
        <Button type="primary" onClick={openCreateModal}>
          记录一下
        </Button>
      </div>
      <Modal
        title={isEdit ? '修改日志' : '新增日志'}
        visible={isModalVisible}
        onOk={createOrUpdateLog}
        onCancel={cancelEditModal}
        width={600}
        okText="确认"
        cancelText="取消"
      >
        <div className="modalContent">
          <div className="formItem">
            <div className="formItemLabel">日期:</div>
            <div className="formItemContent">
              <DatePicker
                onChange={(date, dateString) => setLogDate(dateString)}
                value={dayjs(logDate)}
              />
              {/* <Input
                onChange={(e) => setLogDate(e.target.value)}
                value={logDate}
              /> */}
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">内容:</div>
            <div className="formItemContent">
              <TextArea
                rows={5}
                onInput={(e) => {
                  setContent(e.target.value)
                }}
                value={content}
              ></TextArea>
              <Emoji emojiClickCallback={emojiClickCallback} />
            </div>
          </div>
        </div>
      </Modal>
      <Table
        columns={columns}
        dataSource={siteLog}
        rowKey={(record) => record._id}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: false,
          showQuickJumper: true,
        }}
      />
    </>
  )
}

export default WebSiteLogs

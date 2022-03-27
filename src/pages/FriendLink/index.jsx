import React, { useState } from 'react'
import { useFriendLink } from '../../hooks'
import { Table, Button, Space, Popconfirm, message, Modal, Input } from 'antd'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'
import {
  _deletefriendLink,
  _createfriendLink,
  _updatefriendLink,
} from '../../network/friendLink'

import './style.css'

const FriendLink = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [friendLinkList, getFriendLinkFromDB] = useFriendLink([])
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [avatar, setAvatar] = useState('')
  const [desc, setDesc] = useState('')

  const createOrUpdateFriendLink = async () => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    if (!name) {
      message.warning('姓名不能为空!')
      return
    }
    if (!link) {
      message.warning('链接不能为空!')
      return
    }
    if (!avatar) {
      message.warning('头像不能为空!')
      return
    }
    if (editId) {
      const res = await _updatefriendLink({
        name,
        link,
        avatar,
        desc,
      })
      if (res) {
        message.success('更新成功!')
        getFriendLinkFromDB()
        cancelEditModal()
      }
    } else {
      const res = await _createfriendLink({
        name,
        link,
        avatar,
        desc,
      })
      if (res) {
        message.success('创建成功!')
        getFriendLinkFromDB()
        cancelEditModal()
      }
    }
  }

  const deletefriendLInk = async (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = await _deletefriendLink(id)
    if (res) {
      message.warning('删除成功')
      getFriendLinkFromDB()
    }
  }

  const openCreateModal = () => {
    setCreateState()
    setIsModalVisible(true)
  }

  const openEditModal = (friendLink) => {
    setEditState(friendLink)
    setIsModalVisible(true)
  }

  const cancelEditModal = () => {
    setCreateState()
    setIsModalVisible(false)
  }

  const setCreateState = () => {
    setIsEdit(false)
    setEditId('')
    setName('')
    setLink('')
    setAvatar('')
    setDesc('')
  }

  const setEditState = (friendLink) => {
    setIsEdit(false)
    setEditId(friendLink._id)
    setName(friendLink.name)
    setLink(friendLink.link)
    setAvatar(friendLink.avatar)
    setDesc(friendLink.desc)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'LInk',
      dataIndex: 'link',
      key: '_id',
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: '_id',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: '_id',
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
            title="确定要删除该友链吗？"
            onConfirm={() => {
              deletefriendLInk(record._id)
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
          添加友链
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={friendLinkList}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: false,
          showQuickJumper: true,
        }}
      />
      <Modal
        title={isEdit ? '添加友链' : '更新友链'}
        visible={isModalVisible}
        onOk={createOrUpdateFriendLink}
        onCancel={cancelEditModal}
        width={500}
        okText="确认"
        cancelText="取消"
      >
        <div className="friendLinkModal">
          <div className="formItem">
            <div className="formItemLabel">Name:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setName(e.target.value)} value={name} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">Link:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setLink(e.target.value)} value={link} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">Avatar:</div>
            <div className="formItemContent">
              <Input
                onChange={(e) => setAvatar(e.target.value)}
                value={avatar}
              />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">Desc:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setDesc(e.target.value)} value={desc} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FriendLink

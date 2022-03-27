import React from 'react'
import useMsg from '../../hooks/useMsg'
import dayjs from 'dayjs'
import { Table, Button, Tag, Space, Popconfirm, message } from 'antd'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'
import { _deletemsg } from '../../network/msg'

const FriendLink = () => {
  const [msgList, getMsgFromDB] = useMsg()

  const createFriendLink = () => {}

  const showMsg = (id) => {}
  const deleteMsg = async (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = await _deletemsg(id)
    if (res) {
      message.warning('删除成功')
      getMsgFromDB()
    }
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
          <Button type="primary" onClick={() => showMsg(record._id)}>
            修改
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该友链吗？"
            onConfirm={() => {
              if (auth.currentUser.uid !== ADMIN_UID) {
                message.warning(VISITOR_TEXT)
                return
              }
              deleteMsg(record._id)
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
        <Button type="primary" onClick={createFriendLink}>
          添加友链
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={msgList}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: false,
          showQuickJumper: true,
        }}
      />
    </>
  )
}

export default FriendLink

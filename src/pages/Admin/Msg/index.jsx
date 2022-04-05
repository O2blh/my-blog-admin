import React from 'react'
import useMsg from '@/hooks/useMsg'
import dayjs from 'dayjs'
import { Table, Button, Space, Popconfirm, message } from 'antd'
import { auth } from '@/network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '@/constants/siteInfo'
import { _deletemsg } from '@/network/msg'

const Msg = () => {
  const [msgList, getMsgFromDB] = useMsg()

  const showMsg = (msg) => {
    // window.open(msg.url, '_blank')
  }

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
      title: '昵称',
      dataIndex: 'nickName',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '联系邮箱',
      dataIndex: 'email',
      key: '_id',
    },
    {
      title: '网址',
      dataIndex: 'url',
      key: '_id',
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '日期',
      dataIndex: 'publishDate',
      key: '_id',
      render: (text) => dayjs(text).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      title: '类型',
      dataIndex: 'msgType',
      key: '_id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '_id',
    },
    {
      title: '操作',
      key: '_id',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showMsg(record)}>
            查看
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该留言吗？"
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
    <Table
      columns={columns}
      dataSource={msgList}
      rowKey={(record) => record._id}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: false,
        showQuickJumper: true,
      }}
    />
  )
}

export default Msg

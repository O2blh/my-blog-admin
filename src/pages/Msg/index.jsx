import React from 'react'
import useMsg from '../../hooks/useMsg'
import dayjs from 'dayjs'
import { Table, Button, Tag, Space, Popconfirm, message } from 'antd'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'
import { _deletemsg } from '../../network/msg'

const Msg = () => {
  const [msgList, getMsgFromDB] = useMsg()

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
      title: '标题',
      dataIndex: 'articleTitle',
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
      title: '分类',
      dataIndex: 'classify',
      key: '_id',
      render: (text) => (
        <>
          <Tag color="#2db7f5">{text}</Tag>
        </>
      ),
    },
    {
      title: 'Tags',
      key: '_id',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: '_id',
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '操作',
      key: '_id',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showMsg(record._id)}>
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
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: false,
        showQuickJumper: true,
      }}
    />
  )
}

export default Msg

import React from 'react'
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd'
import { useDrafts } from '../../hooks'
import dayjs from 'dayjs'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'

const Drafts = () => {
  const [drafts, getDraftsFromDb] = useDrafts()

  const editArticle = () => {}

  const deleteArticle = () => {}

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '保存日期',
      dataIndex: 'saveDate',
      key: '_id',
      render: (text) => dayjs(text).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      title: '分类',
      dataIndex: 'ckassify',
      key: '_id',
      render: (text) => <Tag color="#2db7f5">{text}</Tag>,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: '_id',
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
      dataIndex: 'title',
      key: '_id',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '操作',
      key: '_id',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editArticle(record._id)}>
            修改
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该文章吗？"
            onConfirm={() => {
              if (auth.currentUser.uid !== ADMIN_UID) {
                message.warning(VISITOR_TEXT)
                return
              }
              deleteArticle(record._id)
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
      <Table dataSource={drafts} columns={columns} />
    </>
  )
}

export default Drafts

import React from 'react'
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { auth } from '../../../utils/cloudBase'
import ROUTES from '../../../constants/routes'
import { ADMIN_UID, VISITOR_TEXT } from '../../../constants/siteInfo'

const ArticleTabel = ({ articlesShow }) => {
  const history = useHistory()
  const editArticle = (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    history.push(`${ROUTES.ADD_ARTICLE}?id=${id}$isDraft=`)
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
      render: (text) => text,
    },
    {
      title: '分类',
      dataIndex: 'classify',
      key: 'classify',
      render: (text) => (
        <>
          <Tag color="#2db7f5">{text}</Tag>
        </>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
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
      key: 'url',
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
          <Button type="primary" onClick={() => editArticle(record._id)}>
            修改
          </Button>
          <Popconfirm
            placement="topRight"
            title="确定要删除该文章吗？"
            onConfirm={() => {
              // if (auth.currentUser.uid !== adminUid) {
              //   message.warning(visitorText)
              //   return
              // }
              // deleteArticle(record._id)
              // classMinOne(record.classes)
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
      dataSource={articlesShow}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: false,
        showQuickJumper: true,
      }}
    />
  )
}

export default ArticleTabel

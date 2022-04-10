import React from 'react'
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd'
import { useDrafts } from '@/hooks'
import dayjs from 'dayjs'
import { auth } from '@/network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '@/constants/siteInfo'
import { useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { _deleteDraft } from '@/network/drafts'

const Drafts = () => {
  const [drafts, getDraftsFromDb] = useDrafts()
  const history = useHistory()
  const editArticle = (id) => {
    history.push(`${ROUTES.ADD_ARTICLE}?draftId=${id}`)
  }

  const deleteArticle = async (id) => {
    const res = await _deleteDraft(id)
    if (res) {
      message.success('删除成功')
      getDraftsFromDb()
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
      title: '保存日期',
      dataIndex: 'modifyDate',
      key: '_id',
      render: (text) => dayjs(text).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      title: '分类',
      dataIndex: 'classify',
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
      dataIndex: 'url',
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
            title="确定要删除该草稿吗？"
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
      <Table
        columns={columns}
        dataSource={drafts}
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

export default Drafts

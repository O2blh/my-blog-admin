import React from 'react'
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { auth, db, _ } from '../../../utils/cloudBase'
import ROUTES from '../../../constants/routes'
import { ADMIN_UID, VISITOR_TEXT } from '../../../constants/siteInfo'

const ArticleTabel = (props) => {
  const { articlesShow } = props
  const history = useHistory()
  const editArticle = (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    history.push(`${ROUTES.ADD_ARTICLE}?articleId=${id}&isDraft=`)
  }
  const deleteArticle = (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    db.collection('article')
      .doc(id)
      .remove()
      .then(() => {
        message.warning('删除成功')
      })
  }
  // 相应分类数目-1
  const classMinOne = (oldClass) => {
    // console.log(oldClass);
    db.collection('classify')
      .where({ classify: oldClass })
      .update({
        count: _.inc(-1),
      })
      .then((res) => {
        if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') return
        // getAllClasses();
      })
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
      render: (text) => text,
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
              classMinOne(record.classes)
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

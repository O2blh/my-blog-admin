import { Button, Modal, message, Input } from 'antd'
import React, { useState } from 'react'
import { useWorks } from '../../hooks'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'
import { _createWorks, _deleteWorks, _updateWorks } from '../../network/works'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

import './style.css'

const Works = () => {
  const [worksList, getWorksFromDB] = useWorks()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [cover, setCover] = useState('')
  const [link, setLink] = useState('')
  const [order, setOrder] = useState('')

  //打开创建弹窗
  const openCreateModal = () => {
    setCreateState()
    setIsModalVisible(true)
  }

  //打开编辑弹窗
  const openEditModal = (works) => {
    setEditState(works)
    setIsModalVisible(true)
  }

  //关闭弹窗
  const cancelEditModal = () => {
    setCreateState()
    setIsModalVisible(false)
  }

  //设置新建状态
  const setCreateState = () => {
    setIsEdit(false)
    setEditId(null)
    setName('')
    setDesc('')
    setCover('')
    setLink('')
    setOrder('')
  }

  //设置编辑状态
  const setEditState = (works) => {
    setIsEdit(true)
    setEditId(works._id)
    setName(works.name)
    setDesc(works.desc)
    setCover(works.cover)
    setLink(works.link)
    setOrder(works.order)
  }

  //添加或者更新作品
  const createOrUpdateWorks = async () => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    if (!name) {
      message.warning('作品名不能为空哦~~~')
      return
    }
    if (!desc) {
      message.warning('描述不能为空哦~~~')
      return
    }
    if (!cover) {
      message.warning('封面不能为空哦~~~')
      return
    }
    if (!link) {
      message.warning('链接不能为空哦~~~')
      return
    }
    if (!order) {
      message.warning('序号不能为空哦~~~')
      return
    }
    if (editId) {
      const res = await _updateWorks(editId, {
        name,
        desc,
        cover,
        link,
        order,
      })
      if (res) {
        message.success('更新成功!')
        getWorksFromDB()
        cancelEditModal()
      }
    } else {
      const res = await _createWorks({
        name,
        desc,
        cover,
        link,
        order,
      })
      if (res) {
        message.success('创建成功!')
        getWorksFromDB()
        cancelEditModal()
      }
    }
  }

  const deleteWorks = async (id) => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = await _deleteWorks(id)
    if (res) {
      message.success('删除成功!')
      getWorksFromDB()
    }
  }

  return (
    <>
      <div className="searchBox">
        <Button type="primary" onClick={openCreateModal}>
          添加作品
        </Button>
      </div>
      <div className="worksList">
        {worksList.map((works) => {
          return (
            <div
              className="worksItem"
              style={{ backgroundImage: `url(${works.cover})` }}
            >
              <a
                className="worksName"
                target="_blank"
                rel="noreferrer"
                href={works.link}
              >
                {works.name}
              </a>
              <div className="worksDesc">{works.desc}</div>
              <div className="worksOrder">{works.order}</div>
              <div className="oprBtn">
                <FormOutlined
                  onClick={() => {
                    openEditModal(works)
                  }}
                />

                <DeleteOutlined />
              </div>
              <div className="exposeMask"></div>
            </div>
          )
        })}
      </div>
      <Modal
        title={isEdit ? '更新作品' : '添加作品'}
        visible={isModalVisible}
        onOk={createOrUpdateWorks}
        onCancel={cancelEditModal}
        width={600}
        okText="确认"
        cancelText="取消"
      >
        <div className="modalContent">
          <div className="formItem">
            <div className="formItemLabel">名称:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setName(e.target.value)} value={name} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">描述:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setDesc(e.target.value)} value={desc} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">封面:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setCover(e.target.value)} value={cover} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">链接:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setLink(e.target.value)} value={link} />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel">序号:</div>
            <div className="formItemContent">
              <Input onChange={(e) => setOrder(e.target.value)} value={order} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Works

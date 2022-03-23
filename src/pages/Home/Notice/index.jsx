import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../utils/cloudBase'
import { ADMIN_UID, VISITOR_TEXT, NOTICE_ID } from '../../../constants/siteInfo'
import { Modal, message } from 'antd'

import './style.css'
const Notice = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [notice, setNotice] = useState('')
  const [editingNotice, seteditingNotice] = useState('')
  const getNoticeFromDB = () => {
    db.collection('notice')
      .get()
      .then((res) => {
        console.log(res)
        setNotice(res?.data[0].notice)
      })
  }
  useEffect(() => {
    getNoticeFromDB()
  }, [notice])

  // 打开对话框
  const openNoticeEdit = () => {
    seteditingNotice(notice ? notice : '暂时没有公告QAQ~~~')
    setIsModalVisible(true)
  }
  // 取消对话框
  const noticeEditCancel = () => {
    setIsModalVisible(false)
  }
  const editNotice = () => {
    if (!editingNotice) {
      message.warning('公告不可以为空~')
    }
    if (editingNotice === notice) {
      message.warning('无需更新~')
    }
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    db.collection('notice')
      .doc(NOTICE_ID)
      .update({
        notice: editingNotice,
      })
      .then((res) => {
        console.log(res)
        if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') {
          message.warning(VISITOR_TEXT)
          return
        }
        message.success('更新公告成功！')
        getNoticeFromDB()
        noticeEditCancel()
      })
  }

  return (
    <div className="noticeBox">
      <div className="noticeTitle">公告</div>
      <div className="noticeContent" onDoubleClick={openNoticeEdit}>
        {notice ? notice : '暂时没有公告QAQ~~~'}
      </div>

      <Modal
        title="更新公告"
        visible={isModalVisible}
        centered
        onOk={editNotice}
        onCancel={noticeEditCancel}
        width={400}
        okText="确认"
        cancelText="取消"
      >
        <textarea
          className="noticeEditBox"
          value={editingNotice}
          onChange={(e) => seteditingNotice(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default Notice

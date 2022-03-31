import React, { useEffect, useMemo, useState } from 'react'
import { Button, Popconfirm, message, Input, notification } from 'antd'
import { DeleteOutlined, CopyOutlined, CameraOutlined } from '@ant-design/icons'
import { useLocation, useHistory } from 'react-router-dom'
import { parshQueryString } from '../../utils/helper'
import {
  _createGallery,
  _deleteGallery,
  _getGalleryById,
  _updateGallery,
} from '../../network/gallery'
import ROUTES from '../../constants/routes'
// import { nanoid } from 'nanoid'
import { auth } from '../../network/cloudBase'
import { ADMIN_UID, VISITOR_TEXT } from '../../constants/siteInfo'

import './style.css'

const { TextArea } = Input

const AddGallery = () => {
  const history = useHistory()
  const localtion = useLocation()
  const queryObj = useMemo(() => {
    return parshQueryString(localtion.search)
  }, [localtion.search])

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [descr, setDescr] = useState('')
  const [cover, setCover] = useState('')
  const [pics, setPics] = useState([])

  const getGalleryById = async () => {
    if (queryObj.id) {
      const res = await _getGalleryById(queryObj.id)
      if (res && res.length > 0) {
        const data = res[0]
        setIsEdit(true)
        setId(data._id)
        setTitle(data.title)
        setDescr(data.descr)
        setCover(data.cover)
        setPics(data.pics)
      } else {
        message.warning('相册不存在')
        setTimeout(() => {
          history.push(ROUTES.PIC)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    getGalleryById()
  }, [])

  //创建或更新相册
  const createOrUpdateGallery = async () => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    if (!title) {
      message.info('请输入相册标题！')
      return
    }
    if (!descr) {
      message.info('请输入相册描述！')
      return
    }
    if (!cover) {
      message.info('请输入相册封面！')
      return
    }
    if (pics.length === 0) {
      message.info('请添加照片！')
      return
    }

    if (id) {
      const res = await _updateGallery(id, {
        title,
        descr,
        cover,
        pics,
      })
      if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') {
        message.warning(VISITOR_TEXT)
        return
      }
      afterGalleryChange()
    } else {
      const res = await _createGallery({
        title,
        descr,
        cover,
        pics,
      })
      if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') {
        message.warning(VISITOR_TEXT)
        return
      }
      afterGalleryChange()
    }
  }
  // 更新/添加相册之后的操作
  const afterGalleryChange = () => {
    const message = isEdit ? '更新相册成功' : '添加相册成功'
    const icon = isEdit ? (
      <CopyOutlined style={{ color: 'blue' }} />
    ) : (
      <CameraOutlined style={{ color: 'blue' }} />
    )
    history.push(ROUTES.GALLERY)
    notification.open({
      message,
      icon,
      placement: 'bottomLeft',
      duration: 1.5,
    })
  }
  //删除相册
  const deleteGallery = () => {
    if (auth.currentUser.uid !== ADMIN_UID) {
      message.warning(VISITOR_TEXT)
      return
    }
    const res = _deleteGallery(id)
    if (res) {
      history.push(ROUTES.GALLERY)
      notification.open({
        message: '删除相册成功',
        icon: <DeleteOutlined style={{ color: 'blue' }} />,
        placement: 'bottomLeft',
        duration: 1.5,
      })
    }
  }

  return (
    <>
      <div className="searchBox">
        <Button
          type="primary"
          onClick={() => {
            history.push(ROUTES.GALLERY)
          }}
        >
          返回
        </Button>
        <Button type="primary" onClick={createOrUpdateGallery}>
          {isEdit ? '更新' : '添加'}
        </Button>
        {isEdit && (
          <Popconfirm
            placement="bottomRight"
            title="确定删除该相册吗？"
            onConfirm={deleteGallery}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{}}>
              删除
            </Button>
          </Popconfirm>
        )}
      </div>
      <div className="editBox">
        <div className="inputRegion">
          <div className="formItem">
            <div className="formItemLabel bold">标题:</div>
            <div className="formItemContent">
              <Input
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                value={title}
              />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel bold">描述:</div>
            <div className="formItemContent">
              <Input
                onChange={(e) => {
                  setDescr(e.target.value)
                }}
                value={descr}
              />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel bold">封面:</div>
            <div className="formItemContent">
              <Input
                onChange={(e) => {
                  setCover(e.target.value)
                }}
                value={cover}
              />
            </div>
          </div>
          <div className="formItem">
            <div className="formItemLabel bold">图片:</div>
            <div className="formItemContent">
              <TextArea
                onChange={(e) => {
                  setPics(e.target.value.split(`\n`))
                }}
                value={pics.join(`\n`)}
                rows={20}
              />
            </div>
          </div>
        </div>
        <div className="showRegion">
          <ul className="showPic">
            {pics.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundImage: `url(${item})`,
                }}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AddGallery

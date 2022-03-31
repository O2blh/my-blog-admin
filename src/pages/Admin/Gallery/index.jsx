import React from 'react'
import { Button } from 'antd'
import { useGallery } from '@/hooks'
import { useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'

import './style.css'

const Gallery = () => {
  const [gallery] = useGallery()

  const history = useHistory()
  const turnToCreatePage = (id) => {
    if (id) {
      history.push(`${ROUTES.ADD_GALLERY}?id=${id}`)
    } else {
      history.push(ROUTES.ADD_GALLERY)
    }
  }

  return (
    <>
      <div className="albumBox">
        <div className="toolbar">
          <Button type="primary" onClick={() => turnToCreatePage()}>
            创建相册
          </Button>
        </div>
        <div className="picBox">
          {gallery.map((item) => {
            return (
              <div
                key={item._id}
                className="picItemBox"
                onClick={() => {
                  turnToCreatePage(item._id)
                }}
              >
                <div className="picCoverBox">
                  <img className="picCover" src={item.cover} alt="" />
                  <div className="picNumber">{item.pics.length}</div>
                  <div className="picDesc">{item.descr}</div>
                  <div className="exposeMask"></div>
                </div>
                <div className="picTitle">{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Gallery

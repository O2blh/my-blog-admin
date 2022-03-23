import React, { useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ROUTES from '../../constants/routes'
import { Button } from 'antd'
import useClickAway from '../../hooks/useClickAway'

import './style.css'

const AddArticle = () => {
  const location = useLocation()
  const history = useHistory()
  console.log(location)

  const [isShowPublishBox, setIsShowPublishBox] = useState(false)
  const [title, setTitle] = useState('')

  const publishBoxRef = useRef()
  useClickAway(publishBoxRef, () => {
    setIsShowPublishBox(false)
  })

  return (
    <div className="articleBox">
      <div className="articleTitleBox">
        <input
          className="articleTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入文章标题..."
        />
        <div className="rightBox">
          {/* <div className=''>文章将自动保存至草稿箱</div> */}
          <button
            className="draftsBtn"
            onClick={() => history.push(ROUTES.DRAFTS)}
          >
            草稿箱
          </button>
          <div className="publishBox" ref={publishBoxRef}>
            <button
              type="primary"
              className="publishBtn"
              onClick={() => {
                setIsShowPublishBox(!isShowPublishBox)
              }}
            >
              发布
            </button>
            <div
              className="publishContent"
              style={{ display: isShowPublishBox ? 'block' : 'none' }}
            ></div>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}

export default AddArticle

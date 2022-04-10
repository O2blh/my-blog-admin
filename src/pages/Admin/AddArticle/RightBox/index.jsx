import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import PublishBox from './PublishBox'

import './style.css'

const RightBox = ({ autoSaveMsg, state, dispatch }) => {
  const history = useHistory()
  // 显示发布弹框
  const [isShowPublishBox, setIsShowPublishBox] = useState(false)

  return (
    <div className="rightBox">
      <div className="tooltip">{autoSaveMsg}</div>
      <button
        className="commonBtn draftsBtn"
        onClick={() => history.push(ROUTES.DRAFTS)}
      >
        草稿箱
      </button>
      <div className="publishBox">
        <button
          className="primaryBtn"
          onClick={() => {
            setIsShowPublishBox(!isShowPublishBox)
          }}
        >
          发布
        </button>
        <PublishBox
          isShowPublishBox={isShowPublishBox}
          setIsShowPublishBox={setIsShowPublishBox}
          state={state}
          dispatch={dispatch}
        />
      </div>
    </div>
  )
}

export default RightBox

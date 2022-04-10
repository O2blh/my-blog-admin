import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import PublishBox from './PublishBox'
import useClickAway from '@/hooks/useClickAway'

import './style.css'

const RightBox = ({ autoSaveMsg, state, dispatch }) => {
  const history = useHistory()
  // 显示发布弹框
  const [isShowPublishBox, setIsShowPublishBox] = useState(false)

  const publishBoxRef = useRef()

  //在发布弹框以外点击，隐藏发布框
  useClickAway(publishBoxRef, (event) => {
    //使用antd的Select下拉框会在body下挂载一个dropdown元素，点击dropdown时，这个事件不是从内部触发，这会导致隐藏发布文章的合资，判断一下事件来源是不是从生成的dropdown内部传出来的，如果是，不做任何操作
    if (!document.getElementById('root').contains(event.target)) {
      return
    }
    setIsShowPublishBox(false)
  })

  return (
    <div className="rightBox">
      <div className="tooltip">{autoSaveMsg}</div>
      <button
        className="commonBtn draftsBtn"
        onClick={() => history.push(ROUTES.DRAFTS)}
      >
        草稿箱
      </button>
      <div ref={publishBoxRef} className="publishBox">
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

function areEqual(prevProps, nextProps) {
  return prevProps.state.autoSaveMsg === nextProps.state.autoSaveMsg
}

export default React.memo(RightBox, areEqual)

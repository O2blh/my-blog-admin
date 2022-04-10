import React, { useCallback } from 'react'
import { Input } from 'antd'
import { marked } from 'marked'
import './style.css'

const { TextArea } = Input

const InputRegion = ({ state, dispatch, debounceScrollEvent }) => {
  const { articleContent } = state

  const inputRegionChange = useCallback((e) => {
    const mkd = marked(e.target.value)
    dispatch({
      type: 'update',
      payload: {
        articleContent: e.target.value,
        markdownContent: mkd,
      },
    })
  }, [])

  return (
    <TextArea
      className="inputRegion"
      onChange={inputRegionChange}
      value={articleContent}
      onScroll={debounceScrollEvent}
    ></TextArea>
  )
}

function areEqual(prevProps, nextProps) {
  return prevProps.state.articleContent === nextProps.state.articleContent
}

export default React.memo(InputRegion, areEqual)

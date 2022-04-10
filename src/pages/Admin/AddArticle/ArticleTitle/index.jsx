import React from 'react'

import './style.css'

const ArticleTitle = ({ state, dispatch }) => {
  const { articleTitle } = state
  return (
    <input
      className="articleTitle"
      value={articleTitle}
      onChange={(e) =>
        dispatch({
          type: 'update',
          payload: { articleTitle: e.target.value },
        })
      }
      placeholder="请输入文章标题..."
    />
  )
}

function areEqual(prevProps, nextProps) {
  return prevProps.state.articleTitle === nextProps.state.articleTitle
}

export default React.memo(ArticleTitle, areEqual)

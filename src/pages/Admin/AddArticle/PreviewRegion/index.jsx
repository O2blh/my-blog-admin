import React from 'react'
import './style.css'

const PreviewRegion = React.forwardRef(({ state }, ref) => {
  const { markdownContent } = state
  return (
    <div
      ref={ref}
      className="showRegion markdownStyle"
      dangerouslySetInnerHTML={{
        __html: markdownContent.replace(/<pre>/g, "<pre id='hljs'>"),
      }}
    ></div>
  )
})

function areEqual(prevProps, nextProps) {
  return prevProps.state.markdownContent === nextProps.state.markdownContent
}

export default React.memo(PreviewRegion, areEqual)

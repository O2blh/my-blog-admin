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

export default PreviewRegion

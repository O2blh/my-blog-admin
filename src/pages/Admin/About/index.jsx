import React from 'react'
import { FormOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ROUTES from '@/constants/routes'
import './style.css'

const About = () => {
  const history = useHistory()
  const turnToEditPage = (isMe) => {
    history.push(`${ROUTES.ABOUT_EDIT}?isMe=${isMe}`)
  }
  return (
    <div className="aboutBox">
      <div className="aboutMe">
        <div className="aboutTitle">
          <div className="editBtn" onClick={() => turnToEditPage(1)}>
            <FormOutlined />
          </div>
          <span className="aboutTitleDesc">关于我</span>
        </div>
        <div className="aboutContent"></div>
      </div>
      <div className="aboutSite">
        <div className="aboutTitle">
          <div className="editBtn" onClick={() => turnToEditPage(0)}>
            <FormOutlined />
          </div>
          <span className="aboutTitleDesc">关于本站</span>
        </div>
        <div className="aboutContent"></div>
      </div>
      {/* <div className="editBox">
        <TextArea className="inputRegion"></TextArea>
        <div className="showRegion markdownStyle"></div>
      </div> */}
    </div>
  )
}

export default About

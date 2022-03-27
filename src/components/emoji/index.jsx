import React from 'react'
import { Popover, Button } from 'antd'
import {
  emojiPeople,
  emojiNature,
  emojiObj,
  emojiPlace,
  emojiSymbol,
} from '../../constants/siteInfo'

import './style.css'

const Emoji = () => {
  return (
    <div className="emojBox">
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={emojiPeople}
        trigger="click"
      >
        <Button>😄</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={emojiNature}
        trigger="click"
      >
        <Button>☀️</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={emojiObj}
        trigger="click"
      >
        <Button>🏀</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={emojiPlace}
        trigger="click"
      >
        <Button>⛪</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={emojiSymbol}
        trigger="click"
      >
        <Button>🆗</Button>
      </Popover>
    </div>
  )
}

export default Emoji

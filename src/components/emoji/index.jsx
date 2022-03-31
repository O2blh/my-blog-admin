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
  const emojiClick = (e) => {}
  const wrapEmojiPeople = wrapEmoji(emojiPeople).map((emoji) => {
    return <span onClick={emojiClick}>{emoji}</span>
  })

  function wrapEmoji(emojiStr) {
    let len = emojiStr.length
    let i = 0
    const emojiArray = []
    while (i < len) {
      if (emojiStr[i] === '\uD83D') {
      }
      emojiArray.push(emojiStr.substring(i, i + 2))
      i += 2
    }
    return emojiArray
  }

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

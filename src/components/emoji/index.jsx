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

const Emoji = ({ emojiClickCallback }) => {
  const emojiClick = (e) => {
    emojiClickCallback(e.target.textContent)
  }

  function wrapEmoji(emojiStr) {
    const emojiArray = toEmojiArray(emojiStr)
    const wrapEmojiArray = emojiArray.map((emoji, index) => {
      return (
        <span className="emoji" title={emoji} key={index} onClick={emojiClick}>
          {emoji}
        </span>
      )
    })
    return wrapEmojiArray
  }

  function toEmojiArray(emojiStr) {
    let len = emojiStr.length
    let i = 0
    const emojiArray = []
    const regex = /[\ud800-\udbff]/
    while (i < len) {
      if (regex.test(emojiStr[i])) {
        emojiArray.push(emojiStr.substring(i, i + 2))
        i += 2
      } else {
        emojiArray.push(emojiStr.substring(i, i + 1))
        i += 1
      }
    }
    return emojiArray
  }

  const wrapEmojiPeople = wrapEmoji(emojiPeople)
  const wrapEmojiNature = wrapEmoji(emojiNature)
  const wrapEmojiObj = wrapEmoji(emojiObj)
  const wrapEmojiPlace = wrapEmoji(emojiPlace)
  const wrapEmojiSymbol = wrapEmoji(emojiSymbol)

  return (
    <div className="emojBox">
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={wrapEmojiPeople}
        trigger="click"
      >
        <Button>😄</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={wrapEmojiNature}
        trigger="click"
      >
        <Button>☀️</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={wrapEmojiObj}
        trigger="click"
      >
        <Button>🏀</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={wrapEmojiPlace}
        trigger="click"
      >
        <Button>⛪</Button>
      </Popover>
      <Popover
        className="emojiBtn"
        overlayClassName="emojiContent"
        placement="bottom"
        content={wrapEmojiSymbol}
        trigger="click"
      >
        <Button>🆗</Button>
      </Popover>
    </div>
  )
}

export default Emoji

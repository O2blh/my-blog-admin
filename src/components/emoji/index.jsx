import React, { useCallback, useMemo } from 'react'
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
  const emojiClick = useCallback(
    (e) => {
      emojiClickCallback(e.target.textContent)
    },
    [emojiClickCallback]
  )

  const toEmojiArray = useCallback((emojiStr) => {
    const emojiArray = []
    const regex = /\uD83C[\uD000-\uDFFF]|\uD83D[\uD000-\uDFFF]|[\u2000-\u2FFF](\uFE0F)?/g
    const arr = emojiStr.match(regex)
    for (let i = 0; i < arr.length; i += 1) {
      emojiArray.push(arr[i])
    }
    return emojiArray
  }, [])

  const wrapEmoji = useCallback(
    (emojiStr) => {
      const emojiArray = toEmojiArray(emojiStr)
      const wrapEmojiArray = emojiArray.map((emoji, index) => {
        return (
          <span
            className="emoji"
            title={emoji}
            key={index}
            onClick={emojiClick}
          >
            {emoji}
          </span>
        )
      })
      return wrapEmojiArray
    },
    [toEmojiArray, emojiClick]
  )

  const wrapEmojiPeople = useMemo(() => wrapEmoji(emojiPeople), [wrapEmoji])
  const wrapEmojiNature = useMemo(() => wrapEmoji(emojiNature), [wrapEmoji])
  const wrapEmojiObj = useMemo(() => wrapEmoji(emojiObj), [wrapEmoji])
  const wrapEmojiPlace = useMemo(() => wrapEmoji(emojiPlace), [wrapEmoji])
  const wrapEmojiSymbol = useMemo(() => wrapEmoji(emojiSymbol), [wrapEmoji])

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

export default React.memo(Emoji)

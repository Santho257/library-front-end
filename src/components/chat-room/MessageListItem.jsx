import React from 'react'
import useReceiver from '../../hooks/useReceiver'

export default function MessageListItem({ message }) {
  const { receiver } = useReceiver();
  return (
    <li onClick={message.clickable ? () => { getAnswer(message.id) } : undefined}>
      <p className={`message ${((message.receiver == receiver.email || message.self) && "self")}`}>{message.content}</p>
    </li>
  )
}

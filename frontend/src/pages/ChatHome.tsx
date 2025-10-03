import React, { useRef, useState, type ChangeEvent } from 'react'

import MessageList from '../components/MessageList';
import ChatRoom from '../components/ChatRoom';


const ChatHome = () => {
   
  return (
    <div className='flex justify-center '>
         <ChatRoom/>
         <MessageList/>
    </div>
  )
}

export default ChatHome



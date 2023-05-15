import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Chat = () => {

  const {data} = useContext(ChatContext);


  return (
   
     <div className='chat'>
      <div className='userChatInfo'>
        <span>{data.user?.displayName}</span>
      </div>
      <Messages/>
      <Input/>
     </div>
  )
}

export default Chat
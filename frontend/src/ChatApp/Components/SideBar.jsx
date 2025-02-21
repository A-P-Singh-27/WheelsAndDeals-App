
import React, { useEffect } from 'react'
import ChatLoading from './ChatLoading';
import { getSender } from '../Logic/chatLogics';
import { ChatState } from '../Context/ChatProvider';

export default function SideBar({chats}) {
  const {chatUser,selectedChat, setSelectedChat} = ChatState();
    useEffect(()=>{
      console.log(selectedChat);
      
    },[selectedChat])
    console.log(chatUser);
    // console.log(chats);
    
  return (
    // ${!selectedChat ? 'sm:flex' : 'hidden'}
    <div className={` bg-[#d3d7f5] h-[100%] w-[25%] border-2 border-[#bdc4f7] rounded-r-xl`}>
        {
        chats?(
            <div className='overflow-y-scroll max-h-[100%] m-1 rounded-[5px]'>
              {
                chats?.map((chat)=>(
                  <div
                  onClick={()=>setSelectedChat(chat)}
                  className={`cursor-pointer ${selectedChat===chat? 'bg-primary text-white':'bg-[#e8e8e8] text-black'} px-1 sm:px-3 rounded-xl m-0 mb-1 min-h-[46px] h-fit overflow-x-hidden sm:m-1 py-2 flex justify-center items-center`}
                  key={chat._id}
                  >
                    <p className='text-[10px] text-wrap md:text-lg text-center w-[100%] h-[100%]'>
                      {getSender(chatUser._id, chat.users)}
                    </p>
                  </div>
                ))
              }
            </div>
        ):(
          <ChatLoading/>
        )
      }
    </div>
  )
}


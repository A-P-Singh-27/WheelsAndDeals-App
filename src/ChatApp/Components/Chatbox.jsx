import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { isSameSender, isSameSenderMargin } from '../Logic/chatLogics';
import ScrollableFeed from 'react-scrollable-feed';
import { io } from 'socket.io-client';
import MessageLoading from './MessageLoading';

const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;

export default function Chatbox() {
  const { chatUser, setChatUser, chats, setChats, selectedChat, setSelectedChat, } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    console.log(messages);

  }, [messages])
  useEffect(() => {
    if (chatUser) {
      // Initialize the socket connection when chatUser is defined
      socket = io(ENDPOINT);
      socket.emit('setup', chatUser);
      socket.on('connection', () => setSocketConnected(true));

      // Cleanup socket connection when component unmounts or chatUser changes
      return () => {
        if (socket) socket.disconnect();
      };
    }
  }, [chatUser]);

  useEffect(() => {
    if (!socket) return; // Ensure socket is initialized before attaching the listener
    // socket.on('message recieved' , (newMessageReceived)=>{
    // console.log(newMessageReceived);
    // if (!selectedChatCompare || selectedChatCompare._id!=newMessageReceived.chat._id) {
    //     //give notification
    //   }else{
    //     // console.log(messages);

    //     setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    //     // console.log(messages);
    //   }
    // })
    const messageHandler = (newMessageReceived) => {
      // console.log(newMessageReceived);
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Give notification
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };
    socket.on('message recieved', messageHandler);

    // Cleanup: Remove the listener to prevent duplicates
    return () => {
      socket.off('message recieved', messageHandler);
    };
  });

  const fetchMessages = async () => {
    try {
      console.log(selectedChat._id);

      const response = await fetch(`http://localhost:4000/api/chat/fetchmessages/${selectedChat._id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data.messages);
        setMessages(data.messages);
        // setMessages([...messages, ...data.messages]);
        socket.emit("join chat", selectedChat._id);
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  useEffect(() => {
    fetchMessages()

    selectedChatCompare = selectedChat
    // console.log(chatUser);
    // console.log(newMessage);
    // console.log(messages);


  }, [selectedChat]);





  const sendMessage = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newMessage) {
        // socket.emit("stop typing", selectedChat._id)
        try {
          setNewMessage("");
          const response = await fetch(`http://localhost:4000/api/chat/sendmessage`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: chatUser,
              content: newMessage,
              chatId: selectedChat._id,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Response:", data);
            socket.emit("new message", data.message)
            setMessages([...messages, data.message])
          } else {
            const error = await response.json();
          }
        } catch (error) {
          console.error("Error during Login:", error);
          // toast.error('Failed to create group', {
          //   position: "top-left",
          //   autoClose: 1000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
        }
      }
    }
  };

  const handleTyping = async (e) => {
    setNewMessage(e.target.value);

    //typing indicator logic

  }
  return (
    <div className='bg-[#eef0fc] relative h-[100%] w-[75%] flex flex-col justify-end'>
      {/* Main Container */}
      {
        !selectedChat ? (
          <div className='w-[100%] h-[100%] flex justify-center items-center text-gray-400'>
            <p>Click on the Chat to Message</p>
          </div>
        ) : (
          <div className='flex flex-col overflow-y-scroll'>
            {/* Messages Container */}
            <ScrollableFeed>
              {
                messages? messages.map((message, index) => (
                  <div
                    key={`${message._id}-${index}`}
                    className={`flex w-fit max-w-[75%] rounded-xl p-2 text-wrap text-xs md:text-sm lg:text-lg xl:text-lg
                  ml-${isSameSenderMargin(messages, message, index, chatUser._id)}
                  mt-${isSameSender(messages, message, index, chatUser._id) ? 3 : 10}
                  ${message.sender._id === chatUser._id ? 'bg-[#bee3f8]' : 'bg-[#ced3f0]'} mx-2`}
                  >
                    {message.content}
                  </div>
                )) : 
                (
                  <div className='flex w-[100%] h-[89vh] items-center justify-center'>
                    <MessageLoading/>
                  </div>
                )
              }
            </ScrollableFeed>
          </div>
        )
      }
      {/* Input Field */}
      {
        selectedChat ? (
          <form onKeyDown={sendMessage} className='w-[100%] p-2 bg-white border-t border-gray-300'>
            <input
              type="text"
              id="Search"
              onChange={handleTyping}
              value={newMessage}
              placeholder="Enter message here...."
              className="w-full p-2 rounded-md border bg-[#e0e0e0] border-gray-400 shadow-sm sm:text-sm"
            />
          </form>
        ) : (
          <></>
        )
      }
    </div>

  )
}

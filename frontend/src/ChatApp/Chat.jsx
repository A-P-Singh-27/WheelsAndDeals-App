import React, { useEffect, useState } from 'react'
import SideBar from './Components/SideBar'
import Chatbox from './Components/Chatbox'
import { useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChatState } from './Context/ChatProvider';
import Header from '@/components/Header';
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Chat() {
  const { chatUser, setChatUser, chats, setChats } = ChatState();
  const location = useLocation();
  const ownerDetails = location.state || {};
  const navigate = useNavigate();
  // console.log(ownerDetails);
  useEffect(() => {
    // Prevent page refresh or reload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Modern browsers require this to show the prompt
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const user = useUser();
  // console.log(user);
  const userData = {
    name: user?.user?.fullName || `${user?.user?.primaryEmailAddress?.emailAddress?.slice(0, 7)}-anonymous`,
    email: user?.user?.primaryEmailAddress?.emailAddress || `${user?.user?.fullName}abcd@gmail.com`,
    pic: user?.user?.hasImage ? user?.user?.imageUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  }
  // useEffect(()=>{

  //     console.log(chatUser);
  // },[chatUser]);
  const registerUserThenAccessChat = async () => {
    try {

      const response = await fetch(`https://wheelsanddeals.onrender.com/api/chat/adduser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const userdata = await response.json();
        console.log("Response:", userdata);
        setChatUser(userdata.data);
        try {
          const response = await fetch(`https://wheelsanddeals.onrender.com/api/chat/createoraccesschat`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userdata.data._id,
              ownerName: ownerDetails?.ownerName,
              ownerEmail: ownerDetails?.ownerEmail
            })
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Response:", data);
            if (Array.isArray(chats) && !chats.find((c) => c._id === data._id)) {
              setChats([data, ...chats]);
            }

          } else {
            const error = await response.json();
          }
        } catch (error) {
          console.error("Error during Login:", error);
        }
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error("Error during registering User:", error);
    }
  }

  useEffect(() => {
    registerUserThenAccessChat();
  }, [])

  const GoBack = ()=>{
    navigate(-1);
  }


  return (
    <div className='flex flex-col items-center relative'>
      <Header/>
      
      <div className='bg-[#eef0fc] flex justify-around w-[100vw] h-[89vh]'>
        <SideBar chats={chats} />
        <Chatbox />
      </div>
      <div className='flex justify-start w-full px-5 absolute bottom-1 left-[-10px]'>
      <IoArrowBackCircleSharp onClick={GoBack} className='text-[1.5rem] hover:scale-110 text-primary'/>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'
import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import Chat from '@/ChatApp/Chat';
import SideBar from '@/ChatApp/Components/SideBar';
import Chatbox from '@/ChatApp/Components/Chatbox';
import { ChatState } from '@/ChatApp/Context/ChatProvider';
import { useUser } from '@clerk/clerk-react';

export default function Inbox() {
    const { chatUser, setChatUser, chats, setChats } = ChatState();

    const user = useUser();
    // console.log(user);
    const userData = {
        name: user.user.fullName || `${user.user.primaryEmailAddress.emailAddress.slice(0, 7)}-anonymous`,
        email: user.user.primaryEmailAddress.emailAddress || `${user.user.fullName}abcd@gmail.com`,
        pic: user.user.hasImage ?
            user.user.imageUrl
            :
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    }
    useEffect(()=>{

        console.log(chatUser);
    },[chatUser]);
    useEffect(()=>{

        console.log(chats);
    },[chats]);
    const registerUserThenAccessChat = async () => {
        try {

            const response = await fetch(`http://localhost:4000/api/chat/adduser`, {
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
                    const response = await fetch(`http://localhost:4000/api/chat/accesschat`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userdata.data._id,
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Response:", data);
                        // if (Array.isArray(chats) && !chats.find((c) => c._id === data._id)) {
                        //     setChats([data, ...chats]);
                        // }
                        setChats(data)

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
    return (
        <div className='bg-[#eef0fc] flex justify-around w-[100%] h-[76vh]'>
            <SideBar chats={chats} />
            <Chatbox />
        </div>
    )
}

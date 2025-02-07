import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatUser, setChatUser] = useState({});
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState();



    return (
        <ChatContext.Provider value={{
            chatUser, setChatUser,
            chats, setChats,
            selectedChat, setSelectedChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    return useContext(ChatContext);
}

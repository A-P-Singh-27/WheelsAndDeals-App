const user = require('../models/userModel');
const Chat = require('../models/chatModel');


exports.AccessChatsOrCreateChat = async (req, res) => {
    try {

        const { userId , ownerEmail, ownerName} = req.body;
        // console.log(req.body);
        // console.log("Owner email:", ownerEmail);
        // console.log("user id:", userId);

        if (!userId || (!ownerEmail || !ownerName)) {
            console.log('All param not sent with Request');
            return res.status(400).json({
                success: false,
                message: 'All param not sent with Request'
            })
        }
        const owner = await user.findOne({email:ownerEmail});
        // console.log(owner);
        


        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: owner._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ]
        })
            .populate("users")
            .populate("latestMessage")
            .exec();

            // console.log("chat1",  isChat);
            
            
            isChat = await user.populate(isChat, {
                path: "latestMessage.sender",
                select: "name pic email"
            });
            // console.log("chat2",  isChat);
            
        if (isChat.length > 0) {
            return res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [owner._id, userId],
            }
        }

        try {

            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id })
            .populate("users").exec();
            // console.log({fullChat});
            
            return res.status(200).json(fullChat);
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: 'Something went wront in chat49'
            })
        }

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: 'Something went wront in chat56'
        })
    }
}

exports.AccessChatInbox = async (req, res) => {
    try {

        const { userId} = req.body;
        // console.log(req.body);
        // console.log("Owner email:", ownerEmail);
        // console.log("user id:", userId);

        if (!userId) {
            console.log('All param not sent with Request');
            return res.status(400).json({
                success: false,
                message: 'All param not sent with Request'
            })
        }
        
        let isChat = await Chat.find({
            // isGroupChat: false,
            users: { $elemMatch: { $eq: userId } }
        })
            .populate("users")
            .populate("latestMessage")
            .exec();

            // console.log("chat1",  isChat);
            
            
            isChat = await user.populate(isChat, {
                path: "latestMessage.sender",
                select: "name pic email"
            });
            // console.log("chat2",  isChat);
            
            return res.send(isChat);

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: 'Something went wront in chat56'
        })
    }
}
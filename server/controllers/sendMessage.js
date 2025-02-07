const Chat = require("../models/chatModel");
const Message = require('../models/messageModel');
const user = require("../models/userModel");


exports.SendMessage = async (req, res) => {
    const { content, chatId, sender } = req.body;
    console.log(req.body);


    if (!content || !chatId || !sender) {
        console.log(('All data not passed into request.'));
        return res.status(400).json({
            success: false,
            message: 'All data is not present'
        });
    }

    let newMessage = {
        sender: sender._id,
        content: content,
        chat: chatId,
    };
    try {

        let message = await Message.create(newMessage)
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await user.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });

        return res.status(200).json({
            success: true,
            message
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error occured in 45'
        });
    }
}
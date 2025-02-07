const Message = require("../models/messageModel");

exports.FetchMessages = async (req, res) => {
    try {
        // console.log(req.params.chatId);
        
        const messages = await Message.find({ chat: req.params.chatId })
            .populate([
                { path: "sender", select: "name pic" },
                { path: "chat" },
            ]);

        return res.status(200).json({
            success: true,
            messages
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'error Occured..'
        })
    }
}
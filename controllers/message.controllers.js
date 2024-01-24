

import Chat from "../models/Chats/chat.model.js";
import Message from "../models/Chats/message.model.js";
import { User } from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

//@description     Get all Messages
//@route           GET /api/v1/message/:chatId
//@access         Private
const allMessages = asyncWrapper(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "username profile email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  //@description     Create New Message
  //@route           POST /api/v1/message/
  //@access          
  const sendMessage = asyncWrapper(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      let message = await Message.create(newMessage);
  
      message = await message.populate("sender", "username profile")
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  export const messageControllers= {
    sendMessage,
    allMessages
  }
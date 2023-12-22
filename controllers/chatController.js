import ChatModel from "../models/chatModel.js";

// Create chat
export const createChat = async (req, res) => {
  try {
    const newChat = new ChatModel({
      members: [req?.body?.senderId, req?.body?.receiverId],
    });
    const savedChat = await newChat.save();
    res.status(201).json({
      message: "chat created successfully!",
      res: "success",
      data: savedChat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Get all chats of any user
export const userChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      members: { $in: [req?.params?.userId] },
    });
    res.status(200).json({
      message: "chats get successfully!",
      res: "success",
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// find a chat by senderId and ReceiverId
export const findChat = async (req, res) => {
  try {
    const chats = await ChatModel.findOne({
      members: { $all: [req?.params?.firstId, req?.params?.secondId] },
    });
    res.status(200).json({
      message: "chats get successfully!",
      res: "success",
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

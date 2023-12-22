import MessageModel from "../models/messageModel.js";

// add message
export const addMessage = async (req, res) => {
  try {
    const { senderId, chatId, text } = req?.body;
    const newMessage = new MessageModel({
      senderId,
      chatId,
      text,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json({
      message: "chat created successfully!",
      res: "success",
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Get all messages of a particular chat
export const getMesssages = async (req, res) => {
  try {
    const { chatId } = req?.params;
    const messages = await MessageModel.find({ chatId });
    res.status(200).json({
      message: "messages get successfully!",
      res: "success",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

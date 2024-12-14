import Message from "../model/message.js";

export const createMessage=async(req,res,next)=>{
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const newMessage = new Message({ name, email, message });
      await newMessage.save();
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
}
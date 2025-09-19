const Message = require('../models/message');
const Flat = require('../models/flat');

// Get all messages for a flat (flat owner only)
const getAllMessages = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Only flat owner can see all messages
    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: Only flat owner can view messages' });
    }

    const messages = await Message.find({ flatid: req.params.id }).populate('senderid', '-password');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get messages from a specific sender for a flat (sender only)
const getUserMessages = async (req, res) => {
  try {
    const { id, senderId } = req.params;

    // Only the sender can see their messages
    if (req.user._id.toString() !== senderId) {
      return res.status(403).json({ message: 'Forbidden: Only the sender can view these messages' });
    }

    const messages = await Message.find({ flatid: id, senderid: senderId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new message to a flat
const addMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params; // flat id

    const flat = await Flat.findById(id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    const message = new Message({
      content,
      flatid: id,
      senderid: req.user._id
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllMessages,
  getUserMessages,
  addMessage
};

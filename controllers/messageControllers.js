import Message from "../models/Message.js";

export const viewAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: 1 }).limit(20);

    return res.status(200).json({ messages: messages });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 8
 * Controller method to create a new Message
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      user_id: req.body.user_id,
      content: req.body.content,
      category: req.body.category,
    });
    return res
      .status(200)
      .json({ message: "Message was created", newMessage: newMessage });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 9
 * Controller method to find a Message by Id
 * @param {*} req
 * @param {*} res
 */
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById({ _id: req.params._id });

    // if (message.deleted === false) {
    //   return res.status(400).json({ message: "Message not found" });
    // }

    return res
      .status(200)
      .json({ foundMessage: "Message found", message: message });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 10
 * Control method to edit message
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const editMyMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(400).json({ message: "Message not found" });
    }

    if (req.body.user_id !== message.user_id.toString()) {
      return res.status(400).json({ message: "User Id do not match" });
    }

    await Message.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        ["dates.last_edited"]: Date.now(),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({message: "The message was updated 🕺"});
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 11
 * Delete Method
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(400).json({ message: "Message not found" });
    }

    if (req.body.user_id !== message.user_id.toString()) {
      return res.status(400).json({ message: "User Id do not match" });
    }

    await Message.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        ["dates.last_edited"]: Date.now(),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json("The message was Deleted 😲");
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 12
 * Delete Method
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const viewMessageByCategory = async (req, res) => {
  try {
    const viewMessage = await Message.find(
      { category: req.params.category, deleted: false },
      // { deleted: false }
    )
      .populate("user_id")
      .sort({ date: 1 })
      .limit(5);

    if (!viewMessage) {
      return res.status(404).json("Message not found");
    }

    return res.status(200).json({
      message: `Message in the ${req.params.category} category`,
      categoryInfo: viewMessage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error happened", error: error.toString() });
  }
};

export default {
  viewAllMessages,
  createMessage,
  getMessageById,
  editMyMessage,
  deleteMessage,
  viewMessageByCategory,
};

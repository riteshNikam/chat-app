import { Message } from "../models/message.models.js";

const message = async (req, res, next) => {
    try {
        const { messageFrom, messageTo, content } = req.body 
    
        const message = await Message.create({
            messageFrom, 
            messageTo,
            content
        })

        res.status(200).json({
            status: 200,
            message: "message sent succussfully.",
            success: true,
            data: message
        })

    } catch (error) {
        res.status(401).send({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

const getMessages = async (req, res, next) => {
    try {
        const { messageFrom, messageTo } = req.body

        const messages = await Message.find({
            $and: [
                { messageFrom: { $in: [ messageFrom, messageTo ] } },
                { messageTo: { $in: [ messageFrom, messageTo ] } }
            ]
        })

        res.status(200).json({
            status: 200,
            success: true,
            message: "Messages retrieved successfully.",
            data: messages
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: "Something went wrong."
        })
    }
}

export { message, getMessages }
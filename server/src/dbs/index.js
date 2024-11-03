import mongoose from "mongoose";

const DBConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/CHAT_APP')
    } catch (error) {
        throw new Error("Something went wrong while connecting to database.");
    }
}

export { DBConnect }

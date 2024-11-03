import { io } from "socket.io-client";
import store from "../store/store";
import { addMessage } from "../store/messageSlice";

const socket = io('ws://127.0.0.1:4000')

socket.on("connect")
socket.on("message", message => store.dispatch(addMessage({
    type: "message/addMessage",
    message: message
})))

export default socket
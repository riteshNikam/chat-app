import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import socket from "../socket/socket";
import { useSelector } from "react-redux";


const MessageForm = () => {
    const [ content, setContent ] = useState('')
    const { messageTo, currUser } = useSelector(state => state.user)

    const handleSendMessage = async (event) => {
        event.preventDefault()

        if ( messageTo._id ) {
            axios.post('http://127.0.0.1:4000/api/v1/messages/message', {
                messageFrom: currUser._id,
                messageTo: messageTo._id,
                content: content
            })
            .then(
                res => {
                    socket.emit('message' , res.data.data)
                }
            )
            setContent('')
        }
    }

    return (
        <>
            <form action="" onSubmit={event => handleSendMessage(event)} className="border-t border-black flex h-[60px] px-4 py-2 space-x-2">
                <input 
                    autoFocus 
                    type="text" 
                    name="" 
                    id=""
                    value={ content }
                    onChange={ ( event ) => setContent(event.currentTarget.value) } 
                    className="border border-black w-full rounded-3xl text-lg p-5"/>
                <button type="submit" className="border border-black text-2xl px-5 rounded-2xl"><IoSend /></button>
            </form>    
        </>
    )
}

export default MessageForm;
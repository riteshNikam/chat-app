import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messagesArray: []
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getMessages: (state, actions) => {
            const newMessageArray = actions.payload.messages 
            state.messagesArray = newMessageArray
        },
        addMessage: (state, actions) => {
            const newMessage = actions.payload.message 
            state.messagesArray = [ ...state.messagesArray, newMessage ] 
        }
    }
})

export const { getMessages, addMessage } = messageSlice.actions
export default messageSlice.reducer
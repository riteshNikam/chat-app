import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currUser: {},
    messageTo: {},
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrUser: (state, actions) => {
            const user = actions.payload.user
            state.currUser = user
        },
        removeCurrUser: (state, actions) => {
            state.currUser = {}
        },
        setUsers: (state, actions) => {
            state.users = actions.payload.users
        },
        addUser: (state, actions) => {
            const newUser = actions.payload.user
            state.users = [ ...state.users, newUser ]
        },
        setMessageTo: (state, actions) => {
            state.messageTo = actions.payload.user
        }
    }
})

export const { setUsers, addUser, setCurrUser, removeCurrUser, setMessageTo } = userSlice.actions
export default userSlice.reducer
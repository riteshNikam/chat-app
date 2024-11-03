import { useDispatch, useSelector } from "react-redux";
import { setMessageTo } from "../store/userSlice";
import axios from "axios";
import { getMessages } from "../store/messageSlice";

const User = () => {
    const { users, currUser, messageTo } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleMessageTo = (id) => {
        const user = users.find(value => value._id === id)

        dispatch(setMessageTo({
            type: "user/setMessageTo",
            user: user   
        }))

        axios.post('http://127.0.0.1:4000/api/v1/messages/retrieveMessages', {
            messageFrom: currUser._id,
            messageTo: messageTo._id
        })
        .then(
            res => {
               
                dispatch(getMessages({
                    type: "message/getMessages",
                    messages: res.data.data
                }))
            }
        )

    }

    return (
        <>  
            {
                currUser.username && 
                <ul>
                    {
                        users
                        .filter( value => value.username !== currUser.username )
                        .map(
                            value => (
                                <button className="w-full" onClick={ () => handleMessageTo(value._id, value.username) }>
                                    <li className="border bg-indigo-400 text-white font-semibold rounded mb-1 text-center py-1 px-2 hover:bg-indigo-500 hover:rounded" key={ value._id }>{ value.firstname } { value.lastname }</li>
                                </button>
                            )
                        )
                    }
                    
                </ul>
            }
            
        </>
    )
}

export default User;
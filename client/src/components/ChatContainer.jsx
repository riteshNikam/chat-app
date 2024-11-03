import { useSelector } from "react-redux";

const ChatContainer = () => {

    const { messagesArray } = useSelector(state => state.message)
    const { currUser } = useSelector(state => state.user)

    const incomingStyle = "bg-gray-400 p-1 rounded w-fit px-2" // justify-start
    const outgoingStyle = "bg-green-400 p-1 rounded w-fit px-2" // justify-end
    
    return (
        <>  
            <ul>
            {
                messagesArray.map(( value ) => {
                    console.log(value)

                    return (
                        <li key={value._id} className={`my-1 mx-3 flex ${ currUser._id === value.messageFrom ? 'justify-end' : 'justify-start' }`}>
                            <div className={ currUser._id === value.messageFrom ? outgoingStyle : incomingStyle }>
                                { value.content }
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </>
    )
}

export default ChatContainer;
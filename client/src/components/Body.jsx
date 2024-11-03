import ChatBar from "./ChatBar";
import ChatContainer from "./ChatContainer";
import MessageForm from "./MessageForm";

const Body = () => {

    return (
        <>
            <div className="h-[80vh] max-w-6xl mx-auto flex border border-black mt-10 rounded-xl">
                <div className="w-[25%] border-r border-black p-5">
                    <ChatBar></ChatBar>
                </div>

                {
                    <div className="h-[100%] relative w-[75%]">
                        <div className="absolute bottom-0 w-full">
                            <ChatContainer></ChatContainer>
                            <MessageForm></MessageForm>
                        </div>
                    </div>
                }
                
            </div>
        </>
    )
}

export default Body;
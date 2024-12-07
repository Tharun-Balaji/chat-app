import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const imgUrl =
  "data:image/jpeg;base64,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";
export default function Conversation({ conversation, lastIdx, emoji }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isselected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 p-2 py-1 cursor-pointer ${
          isselected ? "bg-sky-500" : ""
        } `}
        onClick={() => setSelectedConversation(conversation)}
      >  
        <div className= {`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="User Avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold to-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx ? <div className="divider my-0 py-0 h-1"></div> : null}
    </>
  );
}

import { useEffect, useState } from "react";
import useConversation from "./../zustand/useConversation";
import { toast } from "react-hot-toast";

export default function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${selectedConversation._id}`
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return {
    loading,
    messages,
  };
}

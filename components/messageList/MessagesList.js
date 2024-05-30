"use client";
import React, { useEffect, useState } from "react";
import { fetchConversations } from "../../lib/firebaseUtils";
import ChatWindow from "../ChatWindow/ChatWindow";

const MessagesList = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const convos = await fetchConversations(user.uid);
        console.log("Fetched conversations:", convos);
        setConversations(convos);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getConversations();
  }, [user]);

  return (
    <div>
      {conversations.map((convo) => (
        <div key={convo.id} onClick={() => setSelectedChat(convo)}>
          <p>
            {convo.users.find((u) => u !== user.uid)}: {convo.lastMessage}
          </p>
        </div>
      ))}
      {selectedChat && <ChatWindow chat={selectedChat} user={user} />}
    </div>
  );
};

export default MessagesList;

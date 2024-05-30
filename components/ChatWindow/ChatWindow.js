"use client";
import React, { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../../lib/firebaseUtils";

const ChatWindow = ({ chat, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const msgs = await fetchMessages(chat.id);
        console.log("Fetched messages:", msgs);
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [chat.id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        await sendMessage(chat.id, user.uid, newMessage);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "300px",
        border: "1px solid black",
        backgroundColor: "white",
      }}
    >
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <p>
              <strong>{msg.sender === user.uid ? "Me" : "Them"}:</strong>{" "}
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

"use client";
import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import axios from "axios";

export default function ContactedHirersList({ user }) {
  const [contactedUsers, setContactedUsers] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const usec = sessionStorage.getItem("user");
  console.log("usec", usec);
  useEffect(() => {
    const fetchContactedUsers = async () => {
      if (user) {
        try {
          console.log("bruh", usec);
          const userId = usec;
          const contactsRef = collection(db, "messages");
          const q = query(
            contactsRef,
            where("participants", "array-contains", userId)
          );
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const userIds = snapshot.docs
              .map((doc) =>
                doc
                  .data()
                  .participants.filter((participant) => participant !== userId)
              )
              .flat();
            const uniqueUserIds = [...new Set(userIds)];

            // Fetch user details from the backend
            const response = await axios.post(
              "http://localhost:3001/Hirer/find-by-ids",
              {
                userIds: uniqueUserIds,
              }
            );

            setContactedUsers(response.data);
          } else {
            console.log("No contacted users found.");
          }
        } catch (error) {
          console.error("Error fetching contacted users:", error);
        }
      }
    };

    fetchContactedUsers();
  }, [usec]);

  useEffect(() => {
    if (isChatOpen && selectedUserId) {
      const userId = usec;
      const messagesRef = collection(db, "messages");
      const q = query(
        messagesRef,
        where("participants", "array-contains", userId),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [isChatOpen, selectedUserId, usec]);

  const handleUserClick = async (contactedUserId) => {
    setSelectedUserId(contactedUserId);
    setIsChatOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/User/${contactedUserId}`
      );
      setSelectedUserDetails(response.data.result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedUserId(null);
    setSelectedUserDetails({});
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        text: newMessage,
        participants: [usec, selectedUserId],
        timestamp: serverTimestamp(),
        senderId: usec,
      };

      try {
        await addDoc(collection(db, "messages"), messageData);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-14 -right-16 max-h-64 overflow-y-auto border border-gray-300 rounded bg-white shadow-lg w-64">
        <ul className="p-2">
          {contactedUsers.map((contactedUser) => (
            <li
              key={contactedUser.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => handleUserClick(contactedUser.id)}
            >
              <img
                src={contactedUser.image}
                alt={contactedUser.fullname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {contactedUser.fullname}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {isChatOpen && selectedUserDetails && (
        <div className="fixed bottom-0 right-10 m-4 w-96 h-[30rem] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">
              Chat with {selectedUserDetails.fullname}
            </h2>
            <button onClick={handleChatClose} className="text-gray-600">
              <IoIosCloseCircle className="text-2xl" />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.senderId === usec
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 self-start text-left"
                }`}
              >
                <p className="text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg mr-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

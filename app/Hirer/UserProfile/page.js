"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import utility from "@/components/utils/utility";
function UserProfilePage(searchParams) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Gender, setGender] = useState("");
  const [Email, setEmail] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const cancelButtonRef = useRef(null);
  const [changeImage, setChangeImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const userId = sessionStorage.getItem("user");
  console.log("bitch", userId);
  const chatUserId = searchParams.searchParams.userId;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(utility.BASE_URL + `User/${chatUserId}`);
        const data = await response.json();
        setUserDetails(data.result);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [chatUserId]);

  useEffect(() => {
    if (isChatOpen) {
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
  }, [isChatOpen, userId]);

  const handleChatButtonClick = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        text: newMessage,
        participants: [userId, chatUserId],
        timestamp: serverTimestamp(),
      };

      try {
        console.log("Sending message:", messageData);
        await addDoc(collection(db, "messages"), messageData);
        console.log("Message sent successfully");
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <h1 className="text-2xl font-semibold text-black">Profile</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <img
              src={userDetails?.image}
              alt="User Profile"
              className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{userDetails?.firstName}</div>
            <div className="text-base text-opacity-75 text-gray-600">
              {userDetails?.lastName}
            </div>
            <div className="text-base text-opacity-75 text-gray-600">
              {userDetails?.companyName}
            </div>
          </div>
          <div className="ml-auto">
            <button
              className="flex items-center justify-center px-4 py-2 bg-[#A5CD39] text-white rounded-lg"
              onClick={handleChatButtonClick}
            >
              <FaRegEdit className="text-xl text-white" />
              <p className="ml-2">Chat</p>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-2xl font-medium mb-4">Personal Information</div>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Email:</p>
              <p className="text-black font-medium">{userDetails?.mail}</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Phone:</p>
              <p className="text-black font-medium">
                {userDetails?.phoneNumber}
              </p>
            </div>
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Full Name:</p>
              <p className="text-black font-medium">{userDetails?.fullname}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-2xl font-medium">Uploaded Resume</div>
          <div className="flex justify-center mt-4">
            <video
              src={userDetails?.video}
              className="rounded-lg object-cover h-96 w-2/3 border-4 border-green-500"
              controls
            />
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-0 right-0 m-4 w-80 h-[40rem] bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">Chat</h2>
            <button onClick={handleChatClose} className="text-gray-600">
              <IoIosCloseCircle className="text-2xl" />
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <p className="text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;

"use client";
import { db } from "@/app/firebase/config"; // Adjust the path to your firebase config
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";

export default function ContactedUsersList({ user }) {
  const [contactedUsers, setContactedUsers] = useState([]);

  useEffect(() => {
    const fetchContactedUsers = async () => {
      if (user) {
        try {
          console.log("User ID:", user.uid);

          const userId = user.uid;
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
            console.log("Unique User IDs:", uniqueUserIds);

            // Fetch user details from the backend
            const response = await axios.post(
              "http://localhost:3001/User/find-by-ids",
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
  }, [user]);

  return (
    <div className="relative">
      <div className="absolute top-14 -right-16 max-h-64 overflow-y-auto border border-gray-300 rounded bg-white shadow-lg w-64">
        <ul className="p-2">
          {contactedUsers.map((contactedUser) => (
            <li key={contactedUser.id} className="py-1 px-2 hover:bg-gray-200">
              {contactedUser.fullname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

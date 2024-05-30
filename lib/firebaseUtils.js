import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../app/firebase/config";

export const createConversation = async (user1Id, user2Id) => {
  const convoRef = doc(collection(db, "conversations"));

  await setDoc(convoRef, {
    users: [user1Id, user2Id],
    lastMessage: "",
    timestamp: serverTimestamp(),
  });

  return convoRef.id;
};

export const sendMessage = async (convoId, senderId, text) => {
  const messagesRef = collection(db, "conversations", convoId, "messages");

  await addDoc(messagesRef, {
    sender: senderId,
    text: text,
    timestamp: serverTimestamp(),
  });

  const convoRef = doc(db, "conversations", convoId);

  await updateDoc(convoRef, {
    lastMessage: text,
    timestamp: serverTimestamp(),
  });
};

export const fetchConversations = async (userId) => {
  const convosRef = collection(db, "conversations");
  const q = query(convosRef, where("users", "array-contains", userId));
  const querySnapshot = await getDocs(q);

  const conversations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return conversations;
};

export const fetchMessages = async (convoId) => {
  const messagesRef = collection(db, "conversations", convoId, "messages");
  const q = query(messagesRef, orderBy("timestamp"));
  const querySnapshot = await getDocs(q);

  const messages = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return messages;
};

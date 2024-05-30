import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { firebaseDb } from "../firebase/firebaseConfig";

class MessageService {
    constructor() {
    }

    async sendMessage(loggedInUserId, friendId, chatId, message) {
        let chatid = chatId || null;

        try {
            if (chatid === null) {
                const chatsRef = collection(firebaseDb, 'chats');

                // Check if chat between users already exists
                const q = query(chatsRef, where('participants', 'array-contains', loggedInUserId));
                const querySnapshot = await getDocs(q);


                querySnapshot.forEach((doc) => {
                    const chat = doc.data();
                    if (chat.participants.includes(friendId)) {
                        chatid = doc.id;
                    }
                });

                // Create a new chat document if it doesn't exist
                const newChatData = {
                    participants: [loggedInUserId, friendId],
                    last_message: message,
                    last_message_timestamp: serverTimestamp(),
                    unreadCount: 0,
                    typingStatus: false,
                };
                const chatDocRef = await addDoc(chatsRef, newChatData);
                chatid = chatDocRef.id;
            }

            // Add new message to the messages sub-collection
            const messagesRef = collection(firebaseDb, 'chats', chatid, 'messages');
            const messageData = {
                sender_id: loggedInUserId,
                message: message,
                created_at: serverTimestamp(),
                seen: false,
            };
            await addDoc(messagesRef, messageData);

            // Update the chat document with the latest message info
            const chatDocRef = doc(firebaseDb, 'chats', chatid);
            await setDoc(chatDocRef, {
                last_message: message,
                last_message_timestamp: serverTimestamp(),
                typingStatus: false,
                unreadCount: 0,
            }, { merge: true });

            return true;
        } catch (error) {
            console.log('Error sending message:', error);
            return false;
        }
    }



}


const messageService = new MessageService();
export default messageService
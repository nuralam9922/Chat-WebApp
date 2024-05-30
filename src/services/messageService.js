import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { firebaseDb } from "../firebase/firebaseConfig";

class MessageService {
    constructor() {
    }

    async sendMessage(loggedInUserId, friendId, chatId, message,) {
        let chatid = chatId || null;
        // console.log(friend);
        try {
            if (chatid === null) {
                // Create a new chat document if chatId is null (first message in this chat)
                const chatsRef = collection(firebaseDb, 'chats');
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

            // Reference the messages sub-collection in the specified or newly created chat document
            const messagesRef = collection(firebaseDb, 'chats', chatid, 'messages');
            const messageData = {
                sender_id: loggedInUserId,
                message: message,
                created_at: serverTimestamp(),
                seen: false,
            };
            await addDoc(messagesRef, messageData);

            // Update the parent chat document with the latest message info
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


    async getChats(loggedInUserId, setValue,chatLoading,setError) {
        const chatsRef = collection(firebaseDb, 'chats');
        const q = query(chatsRef, where('participants', 'array-contains', loggedInUserId));

        const cashedFriends = new Map();
        try {
            const subscribe = onSnapshot(q, async (querySnapshot) => {
                const request = await Promise.all(querySnapshot.docs.map(async (chatDoc) => {
                    const chatId = chatDoc.id;
                    const chatData = chatDoc.data();
                    const friendId = chatData.participants.find((id) => id !== loggedInUserId);

                    let friendInfo;

                    // Check if friend info is already cached
                    if (cashedFriends.has(friendId)) {
                        friendInfo = cashedFriends.get(friendId);
                    } else {
                        const friendDocRef = doc(firebaseDb, 'users', friendId);
                        const friendDocSnap = await getDoc(friendDocRef);

                        if (!friendDocSnap.exists()) {
                            console.error('Friend document does not exist:', friendId);
                            return null;
                        }

                        const friendData = friendDocSnap.data();
                        friendInfo = {
                            id: friendDocSnap.id,
                            full_name: friendData.full_name,
                            username: friendData.username,
                            bio: friendData.bio,
                            profile_picture_url: friendData.profile_picture_url.imageUrl,
                            user_profile_view: friendData.settings.user_profile_view,
                            user_bio_view: friendData.settings.user_bio_view,
                            online_status_view: friendData.settings.online_status_view,
                            last_seen_view: friendData.settings.last_seen_view,
                        };

                        // Cache the friend's details
                        cashedFriends.set(friendId, friendInfo);
                    }
                    // Convert Firestore timestamp to ISO string
                    const lastMessageTimestamp = chatData.last_message_timestamp ? chatData.last_message_timestamp.toDate().toISOString() : null;
                    return {
                        chatId: chatId,
                        friendInfo,
                        last_message: chatData.last_message,
                        last_message_timestamp: lastMessageTimestamp,
                        typingStatus: chatData.typingStatus,
                        unreadCount: chatData.unreadCount,
                    };
                }));

                // Filter out any null results (if friend document did not exist)
                const validRequests = request.filter(chat => chat !== null);

                setValue && setValue(validRequests)
                chatLoading && chatLoading(false)
            });

            return subscribe;
        } catch (error) {
            console.error('Error getting chats:', error);
            setError(error)
        }
    }





}


const messageService = new MessageService();
export default messageService
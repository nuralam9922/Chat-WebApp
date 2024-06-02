import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
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
                    last_message_timestamp: new Date(),
                    unreadCount: 0,
                    typingStatus: [],
                    notDeletedBy: [loggedInUserId, friendId],
                };
                const chatDocRef = await addDoc(chatsRef, newChatData);
                chatid = chatDocRef.id;
            }

            // Reference the messages sub-collection in the specified or newly created chat document
            const messagesRef = collection(firebaseDb, 'chats', chatid, 'messages');
            const messageData = {
                sender_id: loggedInUserId,
                message: message,
                created_at: new Date(),
                seen: [loggedInUserId],
                notDeletedBy: [loggedInUserId, friendId],
                deletedForEveryone: false,
                reactions: [],

            };
            await addDoc(messagesRef, messageData);

            // Update the parent chat document with the latest message info
            const chatDocRef = doc(firebaseDb, 'chats', chatid);
            await setDoc(chatDocRef, {
                last_message: message,
                last_message_timestamp: new Date(),
                typingStatus: [],
                unreadCount: 0,
            }, { merge: true });
            return chatid;
        } catch (error) {
            console.log('Error sending message:', error);
            return false;
        }
    }


    async getChats(loggedInUserId, setValue, chatLoading, setError) {
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

    async getMessages(userId, chatId, callback) {
        const messagesRef = collection(firebaseDb, 'chats', chatId, 'messages');
        const q = query(messagesRef, where('notDeletedBy', 'array-contains', userId), orderBy('created_at', 'asc'));
        // console.log('calling me');
        try {
            const sub = onSnapshot(q, (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        sender_id: data.sender_id,
                        message: data.message,
                        created_at: data.created_at.toDate().toISOString(),
                        seen: data.seen,
                        deletedForEveryone: data?.deletedForEveryone,
                        notDeletedBy: data?.notDeletedBy,
                        reactions: data?.reactions
                    };
                });

                callback(messages)
                // console.log(chatId, messages);
                return messages;
            });
            return sub

        } catch (error) {
            console.error('Error getting messages:', error);
        }
    }

    async deleteForEveryone(chatId, messageId) {
        try {
            // Reference the specific message document in the chat
            const messageRef = doc(firebaseDb, 'chats', chatId, 'messages', messageId);

            // Update the message to indicate it has been deleted
            await updateDoc(messageRef, {
                message: "This message was deleted",
                deletedForEveryone: true,
                seen: true
            });


        } catch (error) {
            console.error('Error deleting message for everyone:', error);
        }
    }

    async deleteMessageForUser(userId, chatId, messageId, paramentDelete) {
        try {
            // Reference the specific message document in the chat
            const messageRef = doc(firebaseDb, 'chats', chatId, 'messages', messageId);

            if (paramentDelete) {
                await deleteDoc(messageRef);
            } else {
                await updateDoc(messageRef, {
                    notDeletedBy: arrayRemove(userId),
                });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }

    async setTypingStatus(chatId, userId) {
        try {
            // Reference the specific chat document
            const chatRef = doc(firebaseDb, 'chats', chatId);
            // Update the typing status
            await updateDoc(chatRef, {
                typingStatus: arrayUnion(userId),
            });
        } catch (error) {
            console.error('Error updating typing status:', error);
        }
    }

    async removeTypingStatus(chatId, userId) {
        try {
            // Reference the specific chat document
            const chatRef = doc(firebaseDb, 'chats', chatId);
            // Update the typing status
            await updateDoc(chatRef, {
                typingStatus: arrayRemove(userId),
            });
        } catch (error) {
            console.error('Error updating typing status:', error);
        }
    }


    async seenMessage(friendId, chatId, messagesIdArray) {
        console.log('messagesIdArray', messagesIdArray);
        try {
            // Reference the specific chat document
            const chatRef = doc(firebaseDb, 'chats', chatId);

            // Create a WriteBatch to perform atomic updates
            const batch = writeBatch(firebaseDb);

            // Update the seen status for each message in the array within the batch
            messagesIdArray.forEach(messageId => {
                const messageRef = doc(firebaseDb, 'chats', chatId, 'messages', messageId);
                batch.update(messageRef, { seen: arrayUnion(friendId) });
            });

            // Update the chat document's unread count based on the number of seen messages
            // const chatDocSnapshot = await getDoc(chatRef);
            // const chatData = chatDocSnapshot.data();
            // const newUnreadCount = Math.max(0, chatData.unreadCount - messagesIdArray.length); // Ensure unread count doesn't go negative
            // batch.update(chatRef, { unreadCount: newUnreadCount });

            // Commit the batch of updates atomically
            await batch.commit();

            console.log('Messages seen and chat updated successfully');
        } catch (error) {
            console.error('Error updating message seen status:', error);
        }
    }


    async seenSingeMessage(friendId, chatId, messageId) {
        try {
            // Reference the specific chat document
            const messageRef = doc(firebaseDb, 'chats', chatId, 'messages', messageId);
            await updateDoc(messageRef, { seen: arrayUnion(friendId) });
        } catch (error) {
            console.error('Error updating message seen status:', error);
        }
    }

    async addReactionToMessage(chatId, messageId, userId, reaction) {
        try {
            // Reference the specific message document in the chat
            const messageRef = doc(firebaseDb, 'chats', chatId, 'messages', messageId);

            // Update the reactions field in the message document using arrayUnion
            await updateDoc(messageRef, { [`reactions.${userId}`]: reaction }, { merge: true });
        } catch (error) {
            console.error('Error adding reaction to message:', error);
        }
    }




}


const messageService = new MessageService();
export default messageService
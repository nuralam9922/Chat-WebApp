import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { firebaseDb } from "../firebase/firebaseConfig";

class UserFriendService {
    constructor() { }



    async getSearchedUsers(searchValue, callback) {
        const searchTerm = searchValue.toLocaleLowerCase()
        const usersRef = collection(firebaseDb, 'users');
        const q = query(usersRef, where('full_name', '>=', searchTerm), where('full_name', '<=', searchTerm + '\uf8ff'));
        try {
            const querySnapshot = await getDocs(q);

            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                email: doc.data().email,
                full_name: doc.data().full_name,
                username: doc.data().username,
                bio: doc.data().bio,
                profile_picture_url: doc.data().profile_picture_url,
                user_profile_view: doc.data().settings.user_profile_view,
                user_bio_view: doc.data().settings.user_bio_view,
            }));
            callback && callback(users);
            return users;
        } catch (error) {
            console.log('Error getting documents: ', error);
            return false
        }
    }



    async sendFriendRequest(userId1, userId2) {
        const friendshipsRef = collection(firebaseDb, 'friendships');
        const existingRequestQuery = query(
            friendshipsRef,
            where('users', 'array-contains-any', [userId1]),
            where('status', '==', 'pending')
        );

        const existingRequests = await getDocs(existingRequestQuery);

        if (existingRequests.empty) {
            const docRef = {
                userId1,
                userId2,
                status: 'pending',
                users: [userId1, userId2],
                timestamp: Date.now()
            };
            await addDoc(friendshipsRef, docRef);
            return 'Friend request sent';
        } else {
            return 'Friend request already sent';
        }
    }

    async getUserFriends(userId, callback) {
        const friendshipsRef = collection(firebaseDb, 'friendships');
        const friendsQuery = query(
            friendshipsRef,
            where('users', 'array-contains', userId),
            where('status', '==', 'confirmed')
        );

        const unsubscribe = onSnapshot(friendsQuery, async (querySnapshot) => {
            const friends = await Promise.all(querySnapshot.docs.map(async (document) => {
                const friendData = document.data();
                const friendId = friendData.userId1 === userId ? friendData.userId2 : friendData.userId1;
                const docRef = doc(firebaseDb, 'users', friendId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return {
                        friendshipId: document.id,
                        id: docSnap.id,
                        email: docSnap.data().email,
                        full_name: docSnap.data().full_name,
                        username: docSnap.data().username,
                        bio: docSnap.data().bio,
                        profile_picture_url: docSnap.data().profile_picture_url,
                        user_profile_view: docSnap.data().settings.user_profile_view,
                        user_bio_view: docSnap.data().settings.user_bio_view,
                    };
                } else {
                    console.error('Friend document does not exist:', friendId);
                }
            }));
            callback && callback(friends);
        });

        return unsubscribe;
    }
    async getUserFriendRequests(userId, callback) {
        const friendshipsRef = collection(firebaseDb, 'friendships');
        const friendRequestsQuery = query(
            friendshipsRef,
            where('userId2', '==', userId),
            where('status', '==', 'pending')
        );

        const unsubscribe = onSnapshot(friendRequestsQuery, async (querySnapshot) => {
            const friendRequests = await Promise.all(querySnapshot.docs.map(async (document) => {
                const requestId = document.id;
                const senderId = document.data().userId1;
                const docRef = doc(firebaseDb, 'users', senderId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return {
                        requestId,
                        sender: {
                            id: docSnap.id,
                            email: docSnap.data().email,
                            full_name: docSnap.data().full_name,
                            username: docSnap.data().username,
                            bio: docSnap.data().bio,
                            profile_picture_url: docSnap.data().profile_picture_url,
                            user_profile_view: docSnap.data().settings.user_profile_view,
                            user_bio_view: docSnap.data().settings.user_bio_view,
                        },
                        status: document.data().status,
                        timestamp: document.data().timestamp
                    };
                } else {
                    console.error('Sender document does not exist:', senderId);
                }
            }));
            callback(friendRequests);
        });

        return unsubscribe;
    }


    async getUserSentFriendRequests(userId, callback) {
        const sentRequestsRef = collection(firebaseDb, 'friendships');
        const sentRequestsQuery = query(sentRequestsRef, where('userId1', '==', userId));
        
        const unsubscribe = onSnapshot(sentRequestsQuery, async (querySnapshot) => {
            const requests = await Promise.all(querySnapshot.docs.map(async (requestDoc) => {
                const data = requestDoc.data();
                const requestId = requestDoc.id;
                const recipientId = data.userId2;
                const senderId = data.userId1;
                const status = data.status;
                const timestamp = data.timestamp;

                // Fetch user details for recipientId
                const recipientDocRef = doc(firebaseDb, 'users', recipientId);
                const recipientDocSnapshot = await getDoc(recipientDocRef);
                const recipientData = recipientDocSnapshot.data();

                return {
                    requestId,
                    recipientId,
                    senderId,
                    status,
                    timestamp,
                    id: senderId,
                    email: recipientData.email,
                    full_name: recipientData.full_name,
                    username: recipientData.username,
                    bio: recipientData.bio,
                    profile_picture_url: recipientData.profile_picture_url,
                    user_profile_view: recipientData.settings.user_profile_view,
                    user_bio_view: recipientData.settings.user_bio_view,
                };
            }));

            callback && callback(requests);
        });

        return unsubscribe;
    }



    async acceptFriendRequest(friendshipId) {
        try {
            const friendshipRef = doc(firebaseDb, 'friendships', friendshipId);
            await updateDoc(friendshipRef, { status: 'confirmed', timestamp: Date.now() });
            return 'Friend request accepted';
        } catch (error) {
            console.log('Error accepting friend request:', error);
            return 'An error occurred while accepting the friend request';
        }
    }
    async rejectFriendRequest(friendshipId) {
        try {
            const friendshipRef = doc(firebaseDb, 'friendships', friendshipId);
            await deleteDoc(friendshipRef);
            return 'Friend request rejected';
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            return 'An error occurred while rejecting the friend request';
        }
    }
    async deleteFriendship(friendshipId) {
        try {
            const friendshipRef = doc(firebaseDb, 'friendships', friendshipId);
            await deleteDoc(friendshipRef);
            return 'Friendship deleted successfully';
        } catch (error) {
            console.error('Error deleting friendship:', error);
            return 'An error occurred while deleting the friendship';
        }
    }

}

export const userFriendService = new UserFriendService();
export default userFriendService;

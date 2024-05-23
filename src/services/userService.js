import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseDb } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";

class UserService {
    constructor() {

    }


    async updateUserDetails(userId, userDetails) {
        try {
            const userRef = await doc(firebaseDb, 'users', userId);
            await setDoc(userRef, userDetails, { merge: true });
            return true
        } catch (error) {
            console.log('Error updating user details:', error);
            return false
        }

    }
    async checkUserNameExists(username) {
        const usernameRef = collection(firebaseDb, 'users');
        const q = query(usernameRef, where('username', '==', username), limit(1)); 
        try {
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.size > 0);
            return querySnapshot.size > 0; 
        } catch (error) {
            console.log('Error checking username exists:', error);
            return false;
        }
    }

}

export const userService = new UserService()
export default userService
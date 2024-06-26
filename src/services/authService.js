import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, firebaseDb } from '../firebase/firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";

class AuthService {
    userId = null;

    constructor() {
        this.googleProvider = new GoogleAuthProvider();

        this.userId = new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user.uid);
                } else {
                    resolve(null);
                }
            });
        });
    }

    async loginWithGoogle() {
        try {
            const user = await signInWithPopup(auth, this.googleProvider);
            const userId = user.user.uid;
            const userRef = await doc(firebaseDb, 'users', userId);
            const userData = await getDoc(userRef);

            const userDetails = {
                id: userId,
                username: "",
                email: user.user.email,
                full_name: user.user.displayName.toLocaleLowerCase(),
                bio: "",
                profile_picture_url: {
                    imageId: null,
                    imageUrl: user.user.photoURL || null,
                },
                settings: {
                    pin_ask_time: 5,
                    pin_enabled: false,
                    pin: null,
                    user_profile_view: 'everyone',
                    user_bio_view: 'everyone',
                    online_status_view: 'everyone',
                    last_seen_view: 'everyone',
                    showProfile: true,
                },
                notifications: {
                    push: true,
                },
                preferences: {
                    theme: 'light',
                    chatBackground: '#ffff',
                },
                account_details: {
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                },
            }
            if (userData.exists()) {
                return userData.data();
            } else {
                await setDoc(userRef, userDetails, { merge: true });
                const userData = await getDoc(userRef);
                return userData.data();
            }


        } catch (error) {
            console.error("Error signing in with Google:", error);
            return false;
        }
    }


    async gteLoggedInUser() {
        try {
            const userId = await this.userId;

            if (userId) {
                const userRef = await doc(firebaseDb, 'users', userId);
                const userData = await getDoc(userRef);
                if (userData.exists()) {
                    return userData.data();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log('Error getting logged in user:', error);
        }
    }

    async logout() {
        try {
            await auth.signOut();
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }
}

const authService = new AuthService();

export default authService;

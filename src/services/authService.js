import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

export const loginAdmin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // Auto-create user if not found (For SETUP ONLY - requested by user)
        // In a real app, you would never do this in the login flow.
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            // Let's try to create it if it matches the specific admin email
            if (email === 'adminlbo@gmail.com') {
                try {
                    const newUser = await createUserWithEmailAndPassword(auth, email, password);
                    return newUser.user;
                } catch (createError) {
                    throw createError;
                }
            }
        }
        throw error;
    }
};

export const logoutAdmin = async () => {
    await signOut(auth);
};

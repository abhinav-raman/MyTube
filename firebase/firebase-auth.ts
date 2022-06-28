import { firebaseApp } from "./firebase-config";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const googleSignIn = () => signInWithRedirect(auth, googleProvider);
export const logIn = async (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);

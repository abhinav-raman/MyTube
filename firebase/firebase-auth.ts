import { firebaseApp } from "./firebase-config";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithRedirect,
  createUserWithEmailAndPassword,
  getRedirectResult
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/youtube.readonly");
googleProvider.addScope("https://www.googleapis.com/auth/youtube");


export const googleSignIn = () => signInWithRedirect(auth, googleProvider);
export const signUp = async (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);
export const logIn = async (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);
export const getGoogleRedirectResult = async () => getRedirectResult(auth);
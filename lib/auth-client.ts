import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	GoogleAuthProvider,
	signInWithPopup,
	User,
} from 'firebase/auth'
import { auth } from './firebase'

/**
 * Sign up a new user with email and password
 */
export async function signUpWithEmail(
	email: string,
	password: string
): Promise<User> {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		return userCredential.user
	} catch (error) {
		throw error
	}
}

/**
 * Sign in an existing user with email and password
 */
export async function signInWithEmail(
	email: string,
	password: string
): Promise<User> {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		return userCredential.user
	} catch (error) {
		throw error
	}
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<User> {
	try {
		const provider = new GoogleAuthProvider()
		const userCredential = await signInWithPopup(auth, provider)
		return userCredential.user
	} catch (error) {
		throw error
	}
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
	try {
		await firebaseSignOut(auth)
	} catch (error) {
		throw error
	}
}


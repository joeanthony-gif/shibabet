import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate that all required env vars are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
	throw new Error(
		'Missing Firebase configuration. Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_* variables are set.'
	)
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Functions with region from env
const functionsRegion =
	process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION || 'europe-west1'
export const functions = getFunctions(app, functionsRegion)






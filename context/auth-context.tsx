'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type { UserProfile } from '@/types/user'

interface AuthContextType {
	user: User | null
	profile: UserProfile | null
	isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	profile: null,
	isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			setUser(firebaseUser)

			if (firebaseUser) {
				// Fetch user profile from Firestore
				try {
					const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
					if (profileDoc.exists()) {
						const data = profileDoc.data()
						setProfile({
							...data,
							createdAt: data.createdAt?.toDate() || new Date(),
						} as UserProfile)
					} else {
						// User exists in Auth but not in Firestore yet (needs onboarding)
						setProfile(null)
					}
				} catch (error) {
					console.error('Error fetching user profile:', error)
					setProfile(null)
				}
			} else {
				setProfile(null)
			}

			setIsLoading(false)
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, profile, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}


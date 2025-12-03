import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Referral } from '@/types/referral'
import type { UserProfile } from '@/types/user'

export interface ReferralWithUsername extends Referral {
	referredUsername?: string
}

export function useReferrals(userId: string | null) {
	const [referrals, setReferrals] = useState<ReferralWithUsername[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (userId) {
			loadReferrals()
		}
	}, [userId])

	const loadReferrals = async () => {
		if (!userId) return

		setIsLoading(true)
		try {
			const referralsRef = collection(db, 'referrals')
			const q = query(
				referralsRef,
				where('referrerUid', '==', userId),
				orderBy('createdAt', 'desc')
			)
			const snapshot = await getDocs(q)

			const referralsData: Referral[] = []
			for (const docSnap of snapshot.docs) {
				const data = docSnap.data()
				referralsData.push({
					id: docSnap.id,
					referrerUid: data.referrerUid,
					referrerCode: data.referrerCode,
					referredUid: data.referredUid,
					createdAt: data.createdAt?.toDate() || new Date(),
					confirmedAt: data.confirmedAt?.toDate() || null,
					status: data.status,
					loopBonusGiven: data.loopBonusGiven || false,
				})
			}

			// Fetch usernames for referred users
			const referralsWithUsernames = await Promise.all(
				referralsData.map(async (ref) => {
					try {
						const userDoc = await getDoc(doc(db, 'users', ref.referredUid))
						if (userDoc.exists()) {
							const userData = userDoc.data() as UserProfile
							return {
								...ref,
								referredUsername: userData.username,
							}
						}
						return ref
					} catch (error) {
						console.error('Error fetching username for referral:', error)
						return ref
					}
				})
			)

			setReferrals(referralsWithUsernames)
		} catch (error) {
			console.error('Error loading referrals:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		referrals,
		isLoading,
		refetch: loadReferrals,
	}
}


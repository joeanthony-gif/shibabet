import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

if (!admin.apps.length) {
	admin.initializeApp()
}

const db = admin.firestore()

/**
 * Cloud Function to get leaderboard data
 * Returns top 20 users and current user's rank (if authenticated)
 */
export const getLeaderboard = functions
	.region('europe-west1')
	.https.onCall(async (data, context) => {
		try {
			// Get top 20 users by pointsTotal
			// Note: For MVP, we'll get all active users and sort in memory
			// This avoids needing a composite index immediately
			const allUsersSnapshot = await db
				.collection('users')
				.where('status', '==', 'active')
				.get()

			// Sort by pointsTotal and take top 20
			const allUsers = allUsersSnapshot.docs.map((doc) => {
				const data = doc.data()
				return {
					uid: doc.id,
					username: data.username || '',
					pointsTotal: data.pointsTotal || 0,
					pointsFromSignup: data.pointsFromSignup || 0,
					pointsFromReferrals: data.pointsFromReferrals || 0,
					pointsFromLoops: data.pointsFromLoops || 0,
				}
			})
			allUsers.sort((a, b) => b.pointsTotal - a.pointsTotal)
			const topUsersData = allUsers.slice(0, 20)

			const topUsers = topUsersData

			// Total users is the length of all active users
			const totalUsers = allUsers.length

			// If user is authenticated, get their rank
			let currentUserRank: number | null = null
			let currentUserData: any = null

			if (context.auth && context.auth.uid) {
				const authUid = context.auth.uid
				// Find current user in the already-fetched list
				const currentUser = allUsers.find((u) => u.uid === authUid)

				if (currentUser) {
					currentUserData = {
						uid: currentUser.uid,
						username: currentUser.username,
						pointsTotal: currentUser.pointsTotal,
						pointsFromSignup: currentUser.pointsFromSignup,
						pointsFromReferrals: currentUser.pointsFromReferrals,
						pointsFromLoops: currentUser.pointsFromLoops,
					}

					// Calculate rank: count users with more points from the sorted list
					currentUserRank = allUsers.findIndex((u) => u.uid === authUid) + 1
				}
			}

			return {
				topUsers,
				totalUsers,
				currentUserRank,
				currentUserData,
			}
		} catch (error) {
			console.error('Error fetching leaderboard:', error)
			
			// Log error to events collection if possible
			try {
				await db.collection('events').add({
					uid: context.auth?.uid || null,
					type: 'error',
					metadata: {
						function: 'getLeaderboard',
						error: error instanceof Error ? error.message : 'Unknown error',
					},
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
				})
			} catch (logError) {
				console.error('Error logging error event:', logError)
			}
			
			throw new functions.https.HttpsError(
				'internal',
				'Failed to fetch leaderboard'
			)
		}
	})


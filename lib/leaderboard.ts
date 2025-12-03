import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase'

export interface LeaderboardUser {
	uid: string
	username: string
	pointsTotal: number
	pointsFromSignup: number
	pointsFromReferrals: number
	pointsFromLoops: number
}

export interface LeaderboardData {
	topUsers: LeaderboardUser[]
	totalUsers: number
	currentUserRank: number | null
	currentUserData: LeaderboardUser | null
}

/**
 * Fetch leaderboard data from Cloud Function
 */
export async function fetchLeaderboard(): Promise<LeaderboardData> {
	try {
		const getLeaderboardFn = httpsCallable(functions, 'getLeaderboard')
		const result = await getLeaderboardFn()
		return result.data as LeaderboardData
	} catch (error) {
		console.error('Error fetching leaderboard:', error)
		throw error
	}
}


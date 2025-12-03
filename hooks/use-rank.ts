import { useState, useEffect } from 'react'
import { fetchLeaderboard } from '@/lib/leaderboard'

export function useRank(userId: string | null) {
	const [rank, setRank] = useState<number | null>(null)
	const [totalUsers, setTotalUsers] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (userId) {
			loadRank()
		}
	}, [userId])

	const loadRank = async () => {
		if (!userId) return

		setIsLoading(true)
		try {
			const leaderboardData = await fetchLeaderboard()
			setRank(leaderboardData.currentUserRank)
			setTotalUsers(leaderboardData.totalUsers)
		} catch (error) {
			console.error('Error loading rank:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		rank,
		totalUsers,
		isLoading,
		refetch: loadRank,
	}
}


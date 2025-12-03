import { useState, useEffect } from 'react'
import { fetchLeaderboard, type LeaderboardData } from '@/lib/leaderboard'

export function useLeaderboard() {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadLeaderboard()
	}, [])

	const loadLeaderboard = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const data = await fetchLeaderboard()
			setLeaderboardData(data)
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to load leaderboard'
			setError(errorMessage)
			console.error('Leaderboard error:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		leaderboardData,
		isLoading,
		error,
		refetch: loadLeaderboard,
	}
}


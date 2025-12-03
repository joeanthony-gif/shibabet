'use client'

import { useAuth } from '@/context/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLeaderboard } from '@/hooks/use-leaderboard'
import type { LeaderboardUser } from '@/lib/leaderboard'

export default function LeaderboardPage() {
	const { user } = useAuth()
	const { leaderboardData, isLoading, error } = useLeaderboard()

	if (isLoading) {
		return (
			<main className='min-h-screen bg-background p-4 sm:p-6'>
				<div className='max-w-4xl mx-auto'>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-center text-muted-foreground'>Loading leaderboard...</p>
						</CardContent>
					</Card>
				</div>
			</main>
		)
	}

	if (error || !leaderboardData) {
		return (
			<main className='min-h-screen bg-background p-4 sm:p-6'>
				<div className='max-w-4xl mx-auto'>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-center text-destructive'>
								{error || 'Failed to load leaderboard'}
							</p>
						</CardContent>
					</Card>
				</div>
			</main>
		)
	}

	const { topUsers, totalUsers, currentUserRank, currentUserData } = leaderboardData

	// Check if current user is in top 20
	const currentUserInTop20 = user && topUsers.some((u) => u.uid === user.uid)

	return (
		<main className='min-h-screen bg-background p-4 sm:p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<div>
					<h1 className='text-3xl font-heading tracking-wide mb-2'>Leaderboard</h1>
					<p className='text-muted-foreground'>
						Top performers on the Shibabet waitlist
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Top 20</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							{topUsers.map((userData, index) => {
								const isCurrentUser = user && userData.uid === user.uid
								return (
									<div
										key={userData.uid}
										role='row'
										aria-label={`Rank ${index + 1}: ${userData.username}`}
										className={`flex items-center justify-between p-4 rounded-md ${
											isCurrentUser
												? 'bg-primary/10 border border-primary/20'
												: 'bg-muted'
										}`}
									>
										<div className='flex items-center gap-4'>
											<div className='w-8 text-center font-bold text-lg'>
												{index + 1}
											</div>
											<div>
												<div className='flex items-center gap-2'>
													<span className='font-medium'>{userData.username}</span>
													{isCurrentUser && (
														<Badge variant='default'>You</Badge>
													)}
												</div>
												<div className='text-xs text-muted-foreground'>
													{userData.pointsTotal} points
												</div>
											</div>
										</div>
										<div className='text-right text-sm text-muted-foreground'>
											<div>Signup: {userData.pointsFromSignup}</div>
											<div>Referrals: {userData.pointsFromReferrals}</div>
											<div>Loops: {userData.pointsFromLoops}</div>
										</div>
									</div>
								)
							})}
						</div>
					</CardContent>
				</Card>

				{user && currentUserData && !currentUserInTop20 && (
					<Card>
						<CardHeader>
							<CardTitle>Your Ranking</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='flex items-center justify-between p-4 rounded-md bg-primary/10 border border-primary/20'>
								<div className='flex items-center gap-4'>
									<div className='w-8 text-center font-bold text-lg'>
										{currentUserRank}
									</div>
									<div>
										<div className='flex items-center gap-2'>
											<span className='font-medium'>{currentUserData.username}</span>
											<Badge variant='default'>You</Badge>
										</div>
										<div className='text-xs text-muted-foreground'>
											{currentUserData.pointsTotal} points
										</div>
									</div>
								</div>
								<div className='text-right text-sm text-muted-foreground'>
									<div>Signup: {currentUserData.pointsFromSignup}</div>
									<div>Referrals: {currentUserData.pointsFromReferrals}</div>
									<div>Loops: {currentUserData.pointsFromLoops}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{user && currentUserRank && (
					<div className='text-center text-sm text-muted-foreground'>
						You&apos;re #{currentUserRank} out of {totalUsers} users
					</div>
				)}
			</div>
		</main>
	)
}


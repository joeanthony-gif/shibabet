'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OnboardingForm } from '@/components/auth/onboarding-form'
import { useReferrals, type ReferralWithUsername } from '@/hooks/use-referrals'
import { useRank } from '@/hooks/use-rank'

export default function DashboardPage() {
	const { user, profile, isLoading } = useAuth()
	const router = useRouter()
	const { referrals, isLoading: isLoadingReferrals } = useReferrals(user?.uid || null)
	const { rank, totalUsers } = useRank(user?.uid || null)
	const [copied, setCopied] = useState<'link' | 'code' | null>(null)

	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/')
		}
	}, [user, isLoading, router])


	const copyToClipboard = async (text: string, type: 'link' | 'code') => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(type)
			setTimeout(() => setCopied(null), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	if (isLoading) {
		return (
			<main className='min-h-screen flex items-center justify-center bg-background'>
				<Card className='max-w-md w-full'>
					<CardContent className='pt-6'>
						<p className='text-center text-muted-foreground'>Loading...</p>
					</CardContent>
				</Card>
			</main>
		)
	}

	if (!user) {
		return null // Will redirect
	}

	// Show onboarding if profile doesn't exist
	if (!profile) {
		return (
			<main className='min-h-screen flex items-center justify-center bg-background p-4'>
				<Card className='max-w-md w-full'>
					<CardHeader>
						<CardTitle className='text-xl font-heading tracking-wide'>
							Complete Your Profile
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-muted-foreground mb-4'>
							Welcome! Let&apos;s set up your profile to get started.
						</p>
						<OnboardingForm
							onSuccess={() => {
								// Profile will be updated via AuthProvider
								// Force a refresh to reload the profile
								window.location.reload()
							}}
							onError={(error) => {
								console.error('Onboarding error:', error)
							}}
						/>
					</CardContent>
				</Card>
			</main>
		)
	}

	const referralLink = `https://shibabet.com/invite/${profile.referralCode}`

	// Show dashboard
	return (
		<main className='min-h-screen bg-background p-4 sm:p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<div>
					<h1 className='text-3xl font-heading tracking-wide mb-2'>
						Welcome, {profile.username}!
					</h1>
					<p className='text-muted-foreground'>
						You&apos;re in. Start earning points by referring friends.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Your Points</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-4xl font-bold text-primary mb-2'>
							{profile.pointsTotal}
						</div>
						<div className='text-sm text-muted-foreground space-y-1'>
							<p>From signup: {profile.pointsFromSignup}</p>
							<p>From referrals: {profile.pointsFromReferrals}</p>
							<p>From loops: {profile.pointsFromLoops}</p>
						</div>
						{rank !== null && totalUsers !== null && (
							<div className='mt-4 pt-4 border-t border-border'>
								<p className='text-sm font-medium'>
									You&apos;re #{rank} out of {totalUsers} users
								</p>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Your Referral Link</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='p-3 bg-muted rounded-md'>
							<code className='text-sm break-all'>{referralLink}</code>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								className='flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
								onClick={() => copyToClipboard(referralLink, 'link')}
								aria-label={copied === 'link' ? 'Link copied' : 'Copy referral link'}
							>
								{copied === 'link' ? 'Copied!' : 'Copy Link'}
							</Button>
							<Button
								variant='outline'
								className='flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
								onClick={() => copyToClipboard(profile.referralCode, 'code')}
								aria-label={copied === 'code' ? 'Code copied' : 'Copy referral code'}
							>
								{copied === 'code' ? 'Copied!' : 'Copy Code'}
							</Button>
						</div>
						<p className='text-sm text-muted-foreground'>
							Share this link to earn points when friends sign up!
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Referral History</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoadingReferrals ? (
							<p className='text-sm text-muted-foreground'>Loading...</p>
						) : referrals.length === 0 ? (
							<p className='text-sm text-muted-foreground'>
								No referrals yet. Share your link to get started!
							</p>
						) : (
							<div className='space-y-2'>
								{referrals.map((ref) => (
									<div
										key={ref.id}
										className='flex items-center justify-between p-3 bg-muted rounded-md'
									>
										<div>
											<p className='font-medium'>
												{(ref as ReferralWithUsername).referredUsername || 'Unknown'}
											</p>
											<p className='text-xs text-muted-foreground'>
												{ref.createdAt.toLocaleDateString()}
											</p>
										</div>
										<Badge
											variant={
												ref.status === 'confirmed'
													? 'default'
													: ref.status === 'pending'
														? 'secondary'
														: 'destructive'
											}
										>
											{ref.status}
										</Badge>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

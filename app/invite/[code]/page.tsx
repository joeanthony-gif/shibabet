'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmailSignupForm } from '@/components/auth/email-signup-form'
import { EmailSigninForm } from '@/components/auth/email-signin-form'
import { GoogleSignInButton } from '@/components/auth/google-signin-button'
import { setReferrerCode, clearReferrerCode } from '@/lib/referrals'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ReferrerInfo {
	username: string
	referralCode: string
}

export default function InvitePage() {
	const params = useParams()
	const router = useRouter()
	const { user } = useAuth()
	const [mode, setMode] = useState<'signup' | 'signin'>('signup')
	const [referrerInfo, setReferrerInfo] = useState<ReferrerInfo | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const code = params?.code as string

	useEffect(() => {
		// Redirect if already logged in
		if (user) {
			router.push('/dashboard')
			return
		}

		// Resolve referrer from code
		const resolveReferrer = async () => {
			if (!code) {
				setError('Invalid invite code')
				setIsLoading(false)
				return
			}

			try {
				// Query Firestore for user with this referral code
				const usersRef = collection(db, 'users')
				const q = query(
					usersRef,
					where('referralCode', '==', code.toUpperCase()),
					limit(1)
				)
				const snapshot = await getDocs(q)

				if (snapshot.empty) {
					setError('Invalid invite code')
					setIsLoading(false)
					return
				}

				const referrerDoc = snapshot.docs[0]
				const referrerData = referrerDoc.data()

				setReferrerInfo({
					username: referrerData.username,
					referralCode: code.toUpperCase(),
				})

				// Store referrer code in localStorage
				setReferrerCode(code.toUpperCase())
			} catch (err) {
				console.error('Error resolving referrer:', err)
				setError('Failed to load invite information')
			} finally {
				setIsLoading(false)
			}
		}

		resolveReferrer()
	}, [code, user, router])

	const handleAuthSuccess = () => {
		router.push('/dashboard')
	}

	const handleRemoveReferrer = () => {
		clearReferrerCode()
		setReferrerInfo(null)
	}

	if (isLoading) {
		return (
			<div className='min-h-[calc(100vh-12rem)] flex items-center justify-center'>
				<Card className='max-w-md w-full'>
					<CardContent className='pt-6'>
						<p className='text-center text-muted-foreground'>Loading...</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (error && !referrerInfo) {
		return (
			<div className='min-h-[calc(100vh-12rem)] flex items-center justify-center'>
				<Card className='max-w-md w-full'>
					<CardHeader>
						<CardTitle className='text-xl font-heading tracking-wide'>
							Invalid Invite
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-muted-foreground mb-4'>{error}</p>
						<Button onClick={() => router.push('/')} className='w-full'>
							Go to Home
						</Button>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className='min-h-[calc(100vh-12rem)] flex items-center justify-center'>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-2xl font-heading tracking-wide text-center'>
						Shibabet – Viral Waitlist
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					{referrerInfo && (
						<div className='p-4 bg-primary/10 border border-primary/20 rounded-md'>
							<div className='flex items-center justify-between mb-2'>
								<p className='text-sm font-medium'>
									You were invited by{' '}
									<span className='text-primary font-bold'>
										{referrerInfo.username}
									</span>
								</p>
								<Button
									variant='ghost'
									size='sm'
									onClick={handleRemoveReferrer}
									className='h-auto p-1'
								>
									×
								</Button>
							</div>
							<p className='text-xs text-muted-foreground'>
								Sign up to join the waitlist and they&apos;ll earn points when
								you complete your profile!
							</p>
						</div>
					)}

					<p className='text-sm text-muted-foreground text-center'>
						Join the waitlist and earn points by referring friends!
					</p>

					<div className='flex gap-2'>
						<Button
							variant={mode === 'signup' ? 'default' : 'outline'}
							className='flex-1'
							onClick={() => setMode('signup')}
						>
							Sign up
						</Button>
						<Button
							variant={mode === 'signin' ? 'default' : 'outline'}
							className='flex-1'
							onClick={() => setMode('signin')}
						>
							Sign in
						</Button>
					</div>

					<div className='space-y-4'>
						{mode === 'signup' ? (
							<EmailSignupForm onSuccess={handleAuthSuccess} />
						) : (
							<EmailSigninForm onSuccess={handleAuthSuccess} />
						)}

						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-card px-2 text-muted-foreground'>
									Or continue with
								</span>
							</div>
						</div>

						<GoogleSignInButton onSuccess={handleAuthSuccess} />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}


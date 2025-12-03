'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmailSignupForm } from '@/components/auth/email-signup-form'
import { EmailSigninForm } from '@/components/auth/email-signin-form'
import { GoogleSignInButton } from '@/components/auth/google-signin-button'

export default function SignInPage() {
	const [mode, setMode] = useState<'signup' | 'signin'>('signup')
	const { user } = useAuth()
	const router = useRouter()

	// Redirect if already logged in
	if (user) {
		router.push('/dashboard')
		return null
	}

	const handleAuthSuccess = () => {
		router.push('/dashboard')
	}

	return (
		<div className='min-h-[calc(100vh-12rem)] flex items-center justify-center p-4'>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-2xl font-heading tracking-wide text-center'>
						{mode === 'signup' ? 'Join the Waitlist' : 'Sign In'}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<p className='text-sm text-muted-foreground text-center'>
						{mode === 'signup'
							? 'Join the waitlist and earn points by referring friends!'
							: 'Welcome back! Sign in to your account.'}
					</p>

					<div className='flex gap-2' role='tablist' aria-label='Authentication mode'>
						<Button
							variant={mode === 'signup' ? 'default' : 'outline'}
							className='flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
							onClick={() => setMode('signup')}
							role='tab'
							aria-selected={mode === 'signup'}
							aria-controls='auth-form'
						>
							Sign up
						</Button>
						<Button
							variant={mode === 'signin' ? 'default' : 'outline'}
							className='flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
							onClick={() => setMode('signin')}
							role='tab'
							aria-selected={mode === 'signin'}
							aria-controls='auth-form'
						>
							Sign in
						</Button>
					</div>

					<div className='space-y-4' id='auth-form' role='tabpanel'>
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


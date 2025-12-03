'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUpWithEmail } from '@/lib/auth-client'
import { Turnstile } from '@/components/turnstile/turnstile'
import toast from 'react-hot-toast'

const signupSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password is too long'),
	confirmPassword: z.string(),
})

type SignupFormData = z.infer<typeof signupSchema>

interface EmailSignupFormProps {
	onSuccess?: () => void
	onError?: (error: string) => void
}

export function EmailSignupForm({
	onSuccess,
	onError,
}: EmailSignupFormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
	const [isVerifyingTurnstile, setIsVerifyingTurnstile] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<SignupFormData>({
		resolver: zodResolver(
			signupSchema.refine((data) => data.password === data.confirmPassword, {
				message: "Passwords don't match",
				path: ['confirmPassword'],
			})
		),
	})

	const password = watch('password')

	const handleTurnstileVerify = useCallback(
		async (token: string) => {
			// Don't verify again if we already have a valid token
			if (turnstileToken) {
				return
			}

			setIsVerifyingTurnstile(true)
			try {
				// Verify token with our API
				const response = await fetch('/api/verify-turnstile', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})

				const result = await response.json()

				if (result.success) {
					setTurnstileToken(token)
					setIsVerifyingTurnstile(false)
				} else {
					toast.error('Verification failed. Please try again.')
					setTurnstileToken(null)
					setIsVerifyingTurnstile(false)
					// Reset widget on error
					if ((window as any).turnstile) {
						const widget = document.querySelector('#turnstile-widget')
						if (widget) {
							;(window as any).turnstile.reset()
						}
					}
				}
			} catch (error) {
				console.error('Turnstile verification error:', error)
				toast.error('Verification failed. Please try again.')
				setTurnstileToken(null)
				setIsVerifyingTurnstile(false)
				// Reset widget on error
				if ((window as any).turnstile) {
					const widget = document.querySelector('#turnstile-widget')
					if (widget) {
						;(window as any).turnstile.reset()
					}
				}
			}
		},
		[turnstileToken]
	)

	const onSubmit = async (data: SignupFormData) => {
		if (!turnstileToken) {
			toast.error('Please complete the verification')
			return
		}

		setIsLoading(true)
		try {
			await signUpWithEmail(data.email, data.password)
			toast.success('Account created successfully!')
			onSuccess?.()
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to sign up'
			toast.error(errorMessage)
			onError?.(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='space-y-2'>
				<label htmlFor='email' className='text-sm font-medium'>
					Email
				</label>
				<Input
					id='email'
					type='email'
					placeholder='you@example.com'
					{...register('email')}
					disabled={isLoading}
				/>
				{errors.email && (
					<p className='text-sm text-destructive'>{errors.email.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<label htmlFor='password' className='text-sm font-medium'>
					Password
				</label>
				<Input
					id='password'
					type='password'
					placeholder='At least 6 characters'
					{...register('password')}
					disabled={isLoading}
				/>
				{errors.password && (
					<p className='text-sm text-destructive'>{errors.password.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<label htmlFor='confirmPassword' className='text-sm font-medium'>
					Confirm Password
				</label>
				<Input
					id='confirmPassword'
					type='password'
					placeholder='Re-enter your password'
					{...register('confirmPassword')}
					disabled={isLoading}
				/>
				{errors.confirmPassword && (
					<p className='text-sm text-destructive'>
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken && (
				<div className='space-y-2'>
					<Turnstile
						siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
						onVerify={handleTurnstileVerify}
						onError={() => {
							toast.error('Verification failed. Please refresh and try again.')
							setTurnstileToken(null)
						}}
					/>
					{isVerifyingTurnstile && (
						<p className='text-xs text-muted-foreground'>
							Verifying...
						</p>
					)}
				</div>
			)}
			{turnstileToken && (
				<div className='p-2 bg-primary/10 border border-primary/20 rounded-md'>
					<p className='text-xs text-primary font-medium'>
						✓ Verification complete
					</p>
				</div>
			)}

			<Button
				type='submit'
				className='w-full'
				disabled={isLoading || !turnstileToken || isVerifyingTurnstile}
			>
				{isLoading ? 'Creating account...' : 'Sign up'}
			</Button>
		</form>
	)
}


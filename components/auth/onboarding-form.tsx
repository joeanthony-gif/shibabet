'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateUsername, normalizeUsername } from '@/lib/username'
import { getReferrerCode, clearReferrerCode } from '@/lib/referrals'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebase'
import toast from 'react-hot-toast'

const onboardingSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username must be at most 20 characters')
		.refine(
			(val) => {
				const validation = validateUsername(val)
				return validation.isValid
			},
			{
				message: 'Invalid username',
			}
		),
	telegramHandle: z
		.string()
		.optional()
		.refine(
			(val) => {
				if (!val || val === '') return true
				// Must start with @ and contain valid Telegram characters
				return /^@[a-zA-Z0-9_]{5,32}$/.test(val)
			},
			{
				message:
					'Telegram handle must start with @ and be 5-32 characters (letters, numbers, underscore)',
			}
		),
})

type OnboardingFormData = z.infer<typeof onboardingSchema>

interface OnboardingFormProps {
	onSuccess?: () => void
	onError?: (error: string) => void
}

export function OnboardingForm({ onSuccess, onError }: OnboardingFormProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<OnboardingFormData>({
		resolver: zodResolver(onboardingSchema),
	})

	const onSubmit = async (data: OnboardingFormData) => {
		setIsLoading(true)
		try {
			// Normalize username
			const normalizedUsername = normalizeUsername(data.username)

			// Get referrer code from localStorage if present
			const referrerCode = getReferrerCode()

			// Call Cloud Function to create user profile
			const createUserProfile = httpsCallable(functions, 'createUserProfile')

			await createUserProfile({
				username: normalizedUsername,
				telegramHandle: data.telegramHandle || null,
				referrerCode: referrerCode || null,
			})

			// Clear referrer code after successful signup
			if (referrerCode) {
				clearReferrerCode()
			}

			onSuccess?.()
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to complete setup'
			
			// If profile already exists, treat it as success (user might have completed it elsewhere)
			if (errorMessage.includes('already exists') || errorMessage.includes('already-exists')) {
				onSuccess?.()
				return
			}
			
			onError?.(errorMessage)
			setError('root', { message: errorMessage })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='space-y-2'>
				<label htmlFor='username' className='text-sm font-medium'>
					Username <span className='text-destructive'>*</span>
				</label>
				<Input
					id='username'
					type='text'
					placeholder='username123'
					{...register('username')}
					disabled={isLoading}
				/>
				{errors.username && (
					<p className='text-sm text-destructive'>{errors.username.message}</p>
				)}
				<p className='text-xs text-muted-foreground'>
					3-20 characters, letters, numbers, and underscores only
				</p>
			</div>

			<div className='space-y-2'>
				<label htmlFor='telegramHandle' className='text-sm font-medium'>
					Telegram Handle (optional)
				</label>
				<Input
					id='telegramHandle'
					type='text'
					placeholder='@yourhandle'
					{...register('telegramHandle')}
					disabled={isLoading}
				/>
				{errors.telegramHandle && (
					<p className='text-sm text-destructive'>
						{errors.telegramHandle.message}
					</p>
				)}
				<p className='text-xs text-muted-foreground'>
					Optional: Your Telegram username starting with @
				</p>
			</div>

			{errors.root && (
				<p className='text-sm text-destructive'>{errors.root.message}</p>
			)}

			<Button type='submit' className='w-full' disabled={isLoading}>
				{isLoading ? 'Setting up...' : 'Complete setup'}
			</Button>
		</form>
	)
}


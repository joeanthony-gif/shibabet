'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithEmail } from '@/lib/auth-client'
import toast from 'react-hot-toast'

const signinSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
})

type SigninFormData = z.infer<typeof signinSchema>

interface EmailSigninFormProps {
	onSuccess?: () => void
	onError?: (error: string) => void
}

export function EmailSigninForm({
	onSuccess,
	onError,
}: EmailSigninFormProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
	})

	const onSubmit = async (data: SigninFormData) => {
		setIsLoading(true)
		try {
			await signInWithEmail(data.email, data.password)
			toast.success('Signed in successfully!')
			onSuccess?.()
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to sign in'
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
					placeholder='Enter your password'
					{...register('password')}
					disabled={isLoading}
				/>
				{errors.password && (
					<p className='text-sm text-destructive'>{errors.password.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full' disabled={isLoading}>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	)
}


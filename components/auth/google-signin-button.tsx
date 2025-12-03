'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/auth-client'
import toast from 'react-hot-toast'

interface GoogleSignInButtonProps {
	onSuccess?: () => void
	onError?: (error: string) => void
}

export function GoogleSignInButton({
	onSuccess,
	onError,
}: GoogleSignInButtonProps) {
	const [isLoading, setIsLoading] = useState(false)

	const handleGoogleSignIn = async () => {
		setIsLoading(true)
		try {
			await signInWithGoogle()
			toast.success('Signed in with Google!')
			onSuccess?.()
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to sign in with Google'
			toast.error(errorMessage)
			onError?.(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			type='button'
			variant='outline'
			className='w-full'
			onClick={handleGoogleSignIn}
			disabled={isLoading}
		>
			{isLoading ? 'Connecting...' : 'Continue with Google'}
		</Button>
	)
}


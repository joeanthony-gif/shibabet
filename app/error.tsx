'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log error to console for debugging
		console.error('Application error:', error)
	}, [error])

	return (
		<main className='min-h-screen flex items-center justify-center bg-background p-4'>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-xl font-heading tracking-wide text-destructive'>
						Something went wrong
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<p className='text-sm text-muted-foreground'>
						We encountered an unexpected error. Please try again or contact support
						if the problem persists.
					</p>
					<div className='flex gap-2'>
						<Button onClick={reset} className='flex-1'>
							Try again
						</Button>
						<Button
							variant='outline'
							onClick={() => (window.location.href = '/')}
							className='flex-1'
						>
							Go home
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}


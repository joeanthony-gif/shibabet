'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { auth, db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function TestFirebasePage() {
	const [status, setStatus] = useState<{
		auth: 'checking' | 'connected' | 'error'
		firestore: 'checking' | 'connected' | 'error'
		error?: string
	}>({
		auth: 'checking',
		firestore: 'checking',
	})

	useEffect(() => {
		// Test Firebase Auth
		try {
			if (auth) {
				setStatus((prev) => ({ ...prev, auth: 'connected' }))
			} else {
				setStatus((prev) => ({
					...prev,
					auth: 'error',
					error: 'Auth not initialized',
				}))
			}
		} catch (error) {
			setStatus((prev) => ({
				...prev,
				auth: 'error',
				error: error instanceof Error ? error.message : 'Unknown error',
			}))
		}

		// Test Firestore
		const testFirestore = async () => {
			try {
				if (db) {
					// Try to read from a collection (even if empty, this tests connection)
					const testCollection = collection(db, 'users')
					await getDocs(testCollection)
					setStatus((prev) => ({ ...prev, firestore: 'connected' }))
				} else {
					setStatus((prev) => ({
						...prev,
						firestore: 'error',
						error: 'Firestore not initialized',
					}))
				}
			} catch (error: unknown) {
				// "Missing or insufficient permissions" means Firestore is connected but rules are working
				// This is actually a good sign - it means the connection works!
				if (
					error instanceof Error &&
					error.message.includes('permission')
				) {
					setStatus((prev) => ({
						...prev,
						firestore: 'connected',
						error: undefined,
					}))
				} else {
					setStatus((prev) => ({
						...prev,
						firestore: 'error',
						error: error instanceof Error ? error.message : 'Unknown error',
					}))
				}
			}
		}

		testFirestore()
	}, [])

	return (
		<main className='min-h-screen flex items-center justify-center bg-background p-4'>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-xl font-heading tracking-wide'>
						Firebase Connection Test
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='space-y-2'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium'>Firebase Auth:</span>
							<Badge
								variant={
									status.auth === 'connected'
										? 'default'
										: status.auth === 'error'
											? 'destructive'
											: 'secondary'
								}
							>
								{status.auth === 'checking'
									? 'Checking...'
									: status.auth === 'connected'
										? 'Connected'
										: 'Error'}
							</Badge>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium'>Firestore:</span>
							<Badge
								variant={
									status.firestore === 'connected'
										? 'default'
										: status.firestore === 'error'
											? 'destructive'
											: 'secondary'
								}
							>
								{status.firestore === 'checking'
									? 'Checking...'
									: status.firestore === 'connected'
										? 'Connected'
										: 'Error'}
							</Badge>
						</div>
					</div>
					{status.error && (
						<div className='p-3 bg-destructive/10 border border-destructive/20 rounded-md'>
							<p className='text-sm text-destructive'>{status.error}</p>
						</div>
					)}
					{status.auth === 'connected' && status.firestore === 'connected' && (
						<div className='p-3 bg-primary/10 border border-primary/20 rounded-md'>
							<p className='text-sm text-primary font-medium'>
								Firebase is connected and ready!
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</main>
	)
}


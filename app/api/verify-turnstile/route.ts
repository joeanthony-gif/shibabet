import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json()

		if (!token) {
			return NextResponse.json(
				{ error: 'Token is required' },
				{ status: 400 }
			)
		}

		const secretKey = process.env.TURNSTILE_SECRET_KEY
		if (!secretKey) {
			return NextResponse.json(
				{ error: 'Turnstile secret key not configured' },
				{ status: 500 }
			)
		}

		// Verify token with Cloudflare
		const response = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					secret: secretKey,
					response: token,
				}),
			}
		)

		const data = await response.json()

		if (data.success) {
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json(
				{ error: 'Turnstile verification failed', errors: data['error-codes'] },
				{ status: 400 }
			)
		}
	} catch (error) {
		console.error('Turnstile verification error:', error)
		return NextResponse.json(
			{ error: 'Failed to verify Turnstile token' },
			{ status: 500 }
		)
	}
}


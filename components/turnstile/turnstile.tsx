'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface TurnstileProps {
	onVerify: (token: string) => void
	onError?: () => void
	siteKey: string
}

export function Turnstile({ onVerify, onError, siteKey }: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isLoaded, setIsLoaded] = useState(() => {
		// Check if already loaded
		return typeof window !== 'undefined' && !!(window as any).turnstile
	})
	const widgetIdRef = useRef<string | null>(null)
	const isRenderingRef = useRef(false)
	const hasRenderedRef = useRef(false)

	// Memoize callbacks to prevent re-renders
	const handleVerify = useCallback(
		(token: string) => {
			onVerify(token)
		},
		[onVerify]
	)

	const handleError = useCallback(() => {
		onError?.()
	}, [onError])

	useEffect(() => {
		// Check if script is already loaded
		if ((window as any).turnstile) {
			setIsLoaded(true)
			return
		}

		// Check if script tag already exists
		const existingScript = document.querySelector(
			'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
		)
		if (existingScript) {
			existingScript.addEventListener('load', () => setIsLoaded(true))
			return
		}

		// Load Turnstile script
		const script = document.createElement('script')
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
		script.async = true
		script.defer = true
		script.onload = () => {
			setIsLoaded(true)
		}
		document.body.appendChild(script)

		return () => {
			// Cleanup widget on unmount
			if (widgetIdRef.current && (window as any).turnstile) {
				try {
					;(window as any).turnstile.remove(widgetIdRef.current)
				} catch (error) {
					console.error('Error removing Turnstile widget:', error)
				}
				widgetIdRef.current = null
			}
		}
	}, [])

	useEffect(() => {
		if (
			isLoaded &&
			containerRef.current &&
			(window as any).turnstile &&
			!widgetIdRef.current &&
			!isRenderingRef.current &&
			!hasRenderedRef.current
		) {
			isRenderingRef.current = true
			hasRenderedRef.current = true
			const turnstile = (window as any).turnstile

			// Remove any existing widgets in this container
			const container = containerRef.current
			if (container && container.children.length > 0) {
				container.innerHTML = ''
			}

			const widgetId = turnstile.render(container, {
				sitekey: siteKey,
				callback: (token: string) => {
					// Only call verify if we don't already have a token
					handleVerify(token)
				},
				'error-callback': () => {
					handleError()
				},
				'expired-callback': () => {
					// Handle expiration - reset token
					handleError()
				},
			})
			widgetIdRef.current = widgetId
			isRenderingRef.current = false
		}

		return () => {
			if (widgetIdRef.current && (window as any).turnstile) {
				try {
					;(window as any).turnstile.remove(widgetIdRef.current)
				} catch (error) {
					// Ignore cleanup errors
				}
				widgetIdRef.current = null
				hasRenderedRef.current = false
			}
		}
	}, [isLoaded, siteKey, handleVerify, handleError])

	return <div ref={containerRef} className='w-full' id='turnstile-widget' />
}


/**
 * Client-side helper for managing referrer context in localStorage
 */

const REFERRER_CODE_KEY = 'shibabet_referrerCode'

/**
 * Get the stored referrer code from localStorage
 */
export function getReferrerCode(): string | null {
	if (typeof window === 'undefined') return null
	return localStorage.getItem(REFERRER_CODE_KEY)
}

/**
 * Set the referrer code in localStorage
 */
export function setReferrerCode(code: string): void {
	if (typeof window === 'undefined') return
	localStorage.setItem(REFERRER_CODE_KEY, code)
}

/**
 * Clear the referrer code from localStorage
 */
export function clearReferrerCode(): void {
	if (typeof window === 'undefined') return
	localStorage.removeItem(REFERRER_CODE_KEY)
}


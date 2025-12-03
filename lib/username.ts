/**
 * Reserved usernames that cannot be used
 */
export const RESERVED_USERNAMES = [
	'admin',
	'support',
	'leaderboard',
	'about',
	'help',
	'contact',
	'root',
	'shibabet',
	'dashboard',
	'login',
	'signup',
	'signin',
	'signout',
	'logout',
	'invite',
	'referral',
	'referrals',
	'api',
	'www',
	'mail',
	'email',
	'user',
	'users',
	'profile',
	'profiles',
	'settings',
	'account',
	'accounts',
	'terms',
	'privacy',
	'legal',
	'blog',
	'news',
	'faq',
	'contact',
	'home',
	'index',
	'null',
	'undefined',
	'test',
	'testing',
	'dev',
	'development',
	'staging',
	'prod',
	'production',
]

/**
 * Validates a username according to Shibabet rules
 * @param username - The username to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateUsername(username: string): {
	isValid: boolean
	error?: string
} {
	// Convert to lowercase for validation
	const lowerUsername = username.toLowerCase()

	// Check length
	if (lowerUsername.length < 3) {
		return { isValid: false, error: 'Username must be at least 3 characters' }
	}
	if (lowerUsername.length > 20) {
		return { isValid: false, error: 'Username must be at most 20 characters' }
	}

	// Check character set: only a-z, 0-9, and underscore
	const validPattern = /^[a-z0-9_]+$/
	if (!validPattern.test(lowerUsername)) {
		return {
			isValid: false,
			error: 'Username can only contain letters, numbers, and underscores',
		}
	}

	// Check if reserved
	if (RESERVED_USERNAMES.includes(lowerUsername)) {
		return { isValid: false, error: 'This username is reserved' }
	}

	return { isValid: true }
}

/**
 * Normalizes a username (converts to lowercase)
 */
export function normalizeUsername(username: string): string {
	return username.toLowerCase().trim()
}


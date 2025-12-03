import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

if (!admin.apps.length) {
	admin.initializeApp()
}

const db = admin.firestore()

/**
 * Generate a unique 8-character alphanumeric referral code
 */
function generateReferralCode(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	let code = ''
	for (let i = 0; i < 8; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return code
}

/**
 * Check if a referral code is unique
 */
async function isReferralCodeUnique(code: string): Promise<boolean> {
	const snapshot = await db
		.collection('users')
		.where('referralCode', '==', code)
		.limit(1)
		.get()
	return snapshot.empty
}

/**
 * Generate a unique referral code
 */
async function generateUniqueReferralCode(): Promise<string> {
	let code = generateReferralCode()
	let attempts = 0
	const maxAttempts = 10

	while (!(await isReferralCodeUnique(code)) && attempts < maxAttempts) {
		code = generateReferralCode()
		attempts++
	}

	if (attempts >= maxAttempts) {
		throw new Error('Failed to generate unique referral code')
	}

	return code
}

/**
 * Cloud Function to create user profile after signup
 */
export const createUserProfile = functions
	.region('europe-west1')
	.https.onCall(async (data, context) => {
		// Verify authentication
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated'
			)
		}

		const uid = context.auth.uid
		const { username, telegramHandle, referrerCode } = data

		// Validate input
		if (!username || typeof username !== 'string') {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'Username is required'
			)
		}

		// Check if user profile already exists
		const userDoc = await db.collection('users').doc(uid).get()
		if (userDoc.exists) {
			throw new functions.https.HttpsError(
				'already-exists',
				'User profile already exists'
			)
		}

		// Check if username is already taken
		const usernameSnapshot = await db
			.collection('users')
			.where('username', '==', username.toLowerCase())
			.limit(1)
			.get()

		if (!usernameSnapshot.empty) {
			throw new functions.https.HttpsError(
				'already-exists',
				'Username is already taken'
			)
		}

		// Generate unique referral code
		const referralCode = await generateUniqueReferralCode()

		// Get user email from auth
		const userRecord = await admin.auth().getUser(uid)
		const email = userRecord.email || ''

		// Prepare user profile
		const userProfile: {
			uid: string
			email: string
			googleLinked: boolean
			telegramLinked: boolean
			username: string
			telegramHandle: string | null
			createdAt: admin.firestore.FieldValue
			referralCode: string
			referredByCode: string | null
			referredByUid: string | null
			pointsTotal: number
			pointsFromSignup: number
			pointsFromReferrals: number
			pointsFromLoops: number
			status: 'active'
			waitlistPosition: number | null
		} = {
			uid,
			email,
			googleLinked: userRecord.providerData.some(
				(provider) => provider.providerId === 'google.com'
			),
			telegramLinked: false, // Will be true when proper Telegram linking is implemented
			username: username.toLowerCase(),
			telegramHandle: telegramHandle || null,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			referralCode,
			referredByCode: referrerCode || null,
			referredByUid: null, // Will be set if referrerCode is provided
			pointsTotal: 5, // Signup bonus
			pointsFromSignup: 5,
			pointsFromReferrals: 0,
			pointsFromLoops: 0,
			status: 'active',
			waitlistPosition: null,
		}

		// If referred, look up referrer
		if (referrerCode) {
			const referrerSnapshot = await db
				.collection('users')
				.where('referralCode', '==', referrerCode)
				.limit(1)
				.get()

			if (!referrerSnapshot.empty) {
				const referrerDoc = referrerSnapshot.docs[0]
				userProfile.referredByUid = referrerDoc.id as string
			}
		}

		// Create user document
		await db.collection('users').doc(uid).set(userProfile)

		// Award signup points (already in userProfile, but log event)
		try {
			await db.collection('events').add({
				uid,
				type: 'signup',
				metadata: {
					username,
					referrerCode: referrerCode || null,
				},
				createdAt: admin.firestore.FieldValue.serverTimestamp(),
			})
		} catch (error) {
			// Log error but don't fail the function
			console.error('Error logging signup event:', error)
		}

		// If referred, create referral record and award points
		if (referrerCode && userProfile.referredByUid) {
			const referralId = `${userProfile.referredByUid}_${uid}`
			const referralDoc = await db
				.collection('referrals')
				.doc(referralId)
				.get()

			if (!referralDoc.exists) {
				// Create referral record
				await db.collection('referrals').doc(referralId).set({
					referrerUid: userProfile.referredByUid,
					referrerCode,
					referredUid: uid,
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
					confirmedAt: admin.firestore.FieldValue.serverTimestamp(),
					status: 'confirmed' as const,
					loopBonusGiven: false,
				})

				// Award +5 points to referrer
				const referrerRef = db
					.collection('users')
					.doc(userProfile.referredByUid)
				await referrerRef.update({
					pointsFromReferrals: admin.firestore.FieldValue.increment(5),
					pointsTotal: admin.firestore.FieldValue.increment(5),
				})

				// Check for loop bonus (referrer's referrer)
				const referrerDoc = await referrerRef.get()
				const referrerData = referrerDoc.data()
				if (referrerData?.referredByUid) {
					const uplineRef = db
						.collection('users')
						.doc(referrerData.referredByUid)
					const uplineDoc = await uplineRef.get()
					const uplineData = uplineDoc.data()

					// Check if loop bonus already given for this referral chain
					const loopBonusCheckId = `${referrerData.referredByUid}_${uid}`
					const loopBonusDoc = await db
						.collection('referrals')
						.doc(loopBonusCheckId)
						.get()

					// Award +1 loop bonus if not already given
					if (uplineData && !loopBonusDoc.exists) {
						await uplineRef.update({
							pointsFromLoops: admin.firestore.FieldValue.increment(1),
							pointsTotal: admin.firestore.FieldValue.increment(1),
						})

						// Mark loop bonus as given (store in referral doc)
						await db
							.collection('referrals')
							.doc(referralId)
							.update({ loopBonusGiven: true })
					}
				}

				// Log referral confirmed event
				try {
					await db.collection('events').add({
						uid: userProfile.referredByUid,
						type: 'referral_confirmed',
						metadata: {
							referredUid: uid,
							referredUsername: username,
						},
						createdAt: admin.firestore.FieldValue.serverTimestamp(),
					})
				} catch (error) {
					// Log error but don't fail the function
					console.error('Error logging referral_confirmed event:', error)
				}
			}
		}

		return { success: true, referralCode }
	})


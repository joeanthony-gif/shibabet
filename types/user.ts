export interface UserProfile {
	uid: string
	email: string
	googleLinked: boolean
	telegramLinked: boolean

	username: string
	telegramHandle: string | null
	createdAt: Date

	referralCode: string
	referredByCode: string | null
	referredByUid: string | null

	pointsTotal: number
	pointsFromSignup: number
	pointsFromReferrals: number
	pointsFromLoops: number

	status: 'active' | 'pending' | 'banned'
	waitlistPosition: number | null
}






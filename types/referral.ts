export type ReferralStatus = 'pending' | 'confirmed' | 'invalid'

export interface Referral {
	id: string
	referrerUid: string
	referrerCode: string
	referredUid: string
	createdAt: Date
	confirmedAt: Date | null
	status: ReferralStatus
	loopBonusGiven: boolean
}






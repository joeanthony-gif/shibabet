export type EventType = 'signup' | 'referral_confirmed' | 'error'

export interface EventLog {
	id: string
	uid: string | null
	type: EventType
	metadata: Record<string, unknown>
	createdAt: Date
}






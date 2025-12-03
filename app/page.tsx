'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { 
	TrendingUp, 
	Shield, 
	Zap, 
	Trophy, 
	Users, 
	BarChart3,
	Sparkles,
	ArrowRight,
	CheckCircle2,
	Star
} from 'lucide-react'

export default function HomePage() {
	const { user } = useAuth()
	const router = useRouter()
	const [currentLineIndex, setCurrentLineIndex] = useState(0) // 0 = not started, 1-3 = line being typed
	const [currentText, setCurrentText] = useState('') // Partial text for current line

	const lines = [
		'Sports Betting 3.0',
		'The Edge is Yours.',
		'Sign up. Stack Points. Become the House.'
	]

	useEffect(() => {
		// Start typewriter effect immediately
		let lineIndex = 0 // 0, 1, 2 for lines array
		let charIndex = 0
		
		const typeNextChar = () => {
			if (lineIndex < lines.length) {
				const lineText = lines[lineIndex]
				
				if (charIndex < lineText.length) {
					// Still typing current line
					setCurrentLineIndex(lineIndex + 1) // 1-based for display
					setCurrentText(lineText.slice(0, charIndex + 1))
					charIndex++
					setTimeout(typeNextChar, 100)
				} else {
					// Line complete, move to next after pause
					setTimeout(() => {
						lineIndex++
						charIndex = 0
						setCurrentText('')
						
						if (lineIndex < lines.length) {
							setCurrentLineIndex(lineIndex + 1)
							setTimeout(typeNextChar, 800)
						} else {
							// All lines done
							setCurrentLineIndex(lines.length + 1)
						}
					}, 800)
				}
			}
		}
		
		// Start typing
		setTimeout(typeNextChar, 500)
	}, [])

	const handleGetStarted = () => {
		if (user) {
			router.push('/dashboard')
		} else {
			router.push('/signin')
		}
	}

	return (
		<div className='min-h-[calc(100vh-12rem)] relative overflow-hidden'>
			{/* Hero Section - Centered Layout */}
			<section className='relative py-12 md:py-20 px-4 overflow-visible min-h-[80vh]'>
				{/* Background gradients */}
				<div className='absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10' />
				
				{/* Centered Content Container */}
				<div className='relative z-10 max-w-7xl mx-auto h-full min-h-[80vh]'>
					{/* Dog Image - Fixed position at bottom center */}
					<div className='absolute bottom-[-40px] md:bottom-[-60px] left-1/2 -translate-x-1/2 w-full max-w-[600px] aspect-square'>
						{/* Buttons - Positioned on either side of dog head, can overlap */}
						{currentLineIndex > lines.length && (
							<>
								{/* Left Button */}
								<div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 animate-fade-in-delay-3'>
									<Button
										size='lg'
										onClick={handleGetStarted}
										className='text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20 text-white whitespace-nowrap'
									>
										{user ? 'Go to Dashboard' : 'Get Started'}
									</Button>
								</div>
								
								{/* Right Button */}
								<div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 animate-fade-in-delay-3'>
									<Link href='/about'>
										<Button
											variant='outline'
											size='lg'
											className='text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-border bg-card/50 text-foreground hover:bg-card hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap'
										>
											Learn More
										</Button>
									</Link>
								</div>
							</>
						)}
						
						{/* Dog Image */}
						<div className='relative w-full h-full'>
							<Image
								src='/shiba_mascot.png'
								alt='Shiba Inu mascot'
								fill
								className='object-contain'
								priority
							/>
						</div>
					</div>
					
					{/* Headings - Centered above dog */}
					<div className='text-center space-y-4 pt-8 pb-[50vh] md:pb-[40vh]'>
						{/* Line 1: Sports Betting 3.0 */}
						{currentLineIndex >= 1 && (
							<h1 className='text-3xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-tight min-h-[1.2em] whitespace-nowrap'>
								{currentLineIndex === 1 ? (
									<>
										<span className='text-secondary'>{currentText}</span>
										{currentText.length < lines[0].length && (
											<span className='inline-block w-0.5 h-[0.9em] bg-secondary ml-1 animate-pulse' />
										)}
									</>
								) : (
									<span className='text-secondary'>{lines[0]}</span>
								)}
							</h1>
						)}
						
						{/* Line 2: The Edge is Yours. */}
						{currentLineIndex >= 2 && (
							<p className='text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground whitespace-nowrap min-h-[1.2em]'>
								{currentLineIndex === 2 ? (
									<>
										<span className='text-foreground'>{currentText.slice(0, 12)}</span>
										<span className='text-secondary'>{currentText.slice(12)}</span>
										{currentText.length < lines[1].length && (
											<span className='inline-block w-0.5 h-[0.9em] bg-secondary ml-1 animate-pulse' />
										)}
									</>
								) : (
									<>
										The Edge is <span className='text-secondary'>Yours</span>.
									</>
								)}
							</p>
						)}
						
						{/* Line 3: Sign up. Stack Points. Become the House. */}
						{currentLineIndex >= 3 && (
							<div className='pt-2 min-h-[1.5em]'>
								<p className='text-sm md:text-base lg:text-lg text-muted-foreground'>
									{currentLineIndex === 3 ? (
										<>
											<span className='text-foreground font-medium'>{currentText.slice(0, 9)}</span>
											{currentText.length > 9 && (
												<>
													{' '}
													<span className='text-accent'>{currentText.slice(9)}</span>
												</>
											)}
											{currentText.length < lines[2].length && (
												<span className='inline-block w-0.5 h-[1em] bg-muted-foreground ml-1 animate-pulse' />
											)}
										</>
									) : (
										<>
											<span className='text-foreground font-medium'>Sign up.</span>{' '}
											<span className='text-accent'>Stack Points.</span>{' '}
											<span className='text-accent font-semibold'>Become the House.</span>
										</>
									)}
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Why Shibabet - Premium Feature Showcase */}
			<section className='py-24 md:py-32 px-4 relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-b from-background via-background to-card/20' />
				<div className='absolute inset-0 opacity-5'>
					<div 
						className='absolute inset-0' 
						style={{
							backgroundImage: `linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)`,
							backgroundSize: '200px 1px',
							backgroundPosition: '0 0',
							animation: 'shimmer 20s linear infinite'
						}} 
					/>
				</div>

				<div className='relative max-w-7xl mx-auto'>
					<div className='text-center mb-20'>
						<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6'>
							<Sparkles className='w-4 h-4 text-secondary' />
							<span className='text-sm font-medium text-secondary'>The Future of Sports Betting</span>
						</div>
						<h2 className='text-5xl md:text-7xl font-heading mb-6 tracking-tight'>
							<span className='bg-gradient-to-r from-foreground via-secondary to-accent bg-clip-text text-transparent'>
								Why Shibabet
							</span>
						</h2>
						<p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
							Built for the next generation of bettors. Experience unmatched liquidity, 
							transparency, and rewards that put you in control.
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
						{[
							{
								icon: TrendingUp,
								title: 'Deep Liquidity',
								description: 'Unlimited betting capacity with institutional-grade liquidity pools. Never miss a bet.',
								gradient: 'from-primary/20 to-primary/5',
								border: 'border-primary/30',
								iconColor: 'text-primary'
							},
							{
								icon: Shield,
								title: 'Fully Transparent',
								description: 'Every transaction, every point, every reward tracked on-chain. Complete verifiability.',
								gradient: 'from-secondary/20 to-secondary/5',
								border: 'border-secondary/30',
								iconColor: 'text-secondary'
							},
							{
								icon: Zap,
								title: 'Lightning Fast',
								description: 'Instant settlements, real-time odds, and seamless betting experience.',
								gradient: 'from-accent/20 to-accent/5',
								border: 'border-accent/30',
								iconColor: 'text-accent'
							},
							{
								icon: BarChart3,
								title: 'Capital Efficient',
								description: 'Maximize your returns with optimized point systems and strategic rewards.',
								gradient: 'from-primary/20 to-primary/5',
								border: 'border-primary/30',
								iconColor: 'text-primary'
							},
							{
								icon: Trophy,
								title: 'Competitive Odds',
								description: 'Best-in-class odds that give you the edge. Fair distribution, better value.',
								gradient: 'from-secondary/20 to-secondary/5',
								border: 'border-secondary/30',
								iconColor: 'text-secondary'
							},
							{
								icon: Users,
								title: 'Community Driven',
								description: 'Token holders become the house. Every bet benefits the community.',
								gradient: 'from-accent/20 to-accent/5',
								border: 'border-accent/30',
								iconColor: 'text-accent'
							}
						].map((feature, idx) => {
							const Icon = feature.icon
							const shadowColor = feature.iconColor === 'text-primary' ? 'hover:shadow-primary/20' : 
								feature.iconColor === 'text-secondary' ? 'hover:shadow-secondary/20' : 
								'hover:shadow-accent/20'
							return (
								<Card
									key={idx}
									className={`group relative overflow-hidden border-2 ${feature.border} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${shadowColor}`}
								>
									<div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
									<CardContent className='p-8 relative z-10'>
										<div className={`inline-flex p-3 rounded-xl bg-background/50 border ${feature.border} mb-6 group-hover:scale-110 transition-transform duration-300`}>
											<Icon className={`w-6 h-6 ${feature.iconColor}`} />
										</div>
										<h3 className='text-2xl font-heading mb-3 text-foreground'>
											{feature.title}
										</h3>
										<p className='text-muted-foreground leading-relaxed'>
											{feature.description}
										</p>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>
			</section>

			{/* Points System - Premium Visualization */}
			<section className='py-24 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-card/30 via-background to-background'>
				<div className='absolute inset-0'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,151,167,0.1),transparent_70%)]' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(185,249,227,0.1),transparent_70%)]' />
				</div>

				<div className='relative max-w-6xl mx-auto'>
					<div className='text-center mb-20'>
						<h2 className='text-5xl md:text-7xl font-heading mb-6 tracking-tight'>
							<span className='bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent'>
								Stack Points
							</span>
						</h2>
						<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
							Multiple pathways to maximize your rewards. Every action counts.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						{[
							{
								points: '+5',
								title: 'Signup Bonus',
								description: 'Complete your profile to unlock your welcome bonus',
								gradient: 'from-primary via-primary/80 to-primary/60',
								bgGradient: 'from-primary/20 via-primary/10 to-transparent',
								border: 'border-primary/40',
								shadow: 'shadow-primary/20'
							},
							{
								points: '+5',
								title: 'Per Referral',
								description: 'Earn points when friends sign up and complete their profile',
								gradient: 'from-secondary via-secondary/80 to-secondary/60',
								bgGradient: 'from-secondary/20 via-secondary/10 to-transparent',
								border: 'border-secondary/40',
								shadow: 'shadow-secondary/20'
							},
							{
								points: '+1',
								title: 'Loop Bonus',
								description: 'Additional points when your referrals refer others',
								gradient: 'from-accent via-accent/80 to-accent/60',
								bgGradient: 'from-accent/20 via-accent/10 to-transparent',
								border: 'border-accent/40',
								shadow: 'shadow-accent/20'
							}
						].map((item, idx) => {
							const getGradientColor = (gradient: string) => {
								if (gradient.includes('primary')) return 'rgba(185, 249, 227, 0.3)'
								if (gradient.includes('secondary')) return 'rgba(0, 151, 167, 0.3)'
								return 'rgba(255, 169, 76, 0.3)'
							}
							return (
								<div
									key={idx}
									className={`group relative p-8 rounded-2xl border-2 ${item.border} bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${item.shadow}`}
								>
									<div 
										className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' 
										style={{
											background: `linear-gradient(135deg, ${getGradientColor(item.gradient)}, transparent)`
										}}
									/>
									<div className='relative z-10'>
										<div className={`text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
											{item.points}
										</div>
										<h3 className='text-2xl font-heading mb-3 text-foreground'>
											{item.title}
										</h3>
										<p className='text-muted-foreground leading-relaxed'>
											{item.description}
										</p>
									</div>
									<div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-500`} />
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* The Platform - Premium Showcase */}
			<section className='py-24 md:py-32 px-4 relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-b from-background to-card/20' />

				<div className='relative max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-16 items-center mb-20'>
						<div>
							<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
								<Star className='w-4 h-4 text-primary' />
								<span className='text-sm font-medium text-primary'>Built for Winners</span>
							</div>
							<h2 className='text-5xl md:text-7xl font-heading mb-6 tracking-tight'>
								<span className='bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent'>
									The Platform
								</span>
							</h2>
							<p className='text-xl text-muted-foreground mb-8 leading-relaxed'>
								Experience sports betting reimagined. Token holders become the house, 
								creating a new paradigm where community and rewards align.
							</p>
							<div className='space-y-4'>
								{[
									'Unlimited referral rewards with no caps',
									'Real-time leaderboard rankings',
									'On-chain point verification',
									'Early access to premium features'
								].map((benefit, idx) => (
									<div key={idx} className='flex items-center gap-3'>
										<CheckCircle2 className='w-5 h-5 text-secondary flex-shrink-0' />
										<span className='text-foreground'>{benefit}</span>
									</div>
								))}
							</div>
						</div>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 rounded-3xl blur-3xl' />
							<Card className='relative border-2 border-border/50 bg-card/50 backdrop-blur-sm p-8 lg:p-12'>
								<div className='space-y-6'>
									<div className='flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20'>
										<div>
											<div className='text-sm text-muted-foreground mb-1'>Your Points</div>
											<div className='text-3xl font-bold text-foreground'>0</div>
										</div>
										<Trophy className='w-8 h-8 text-accent' />
									</div>
									<div className='grid grid-cols-2 gap-4'>
										<div className='p-4 rounded-xl bg-card border border-border'>
											<div className='text-sm text-muted-foreground mb-1'>Rank</div>
											<div className='text-2xl font-bold text-foreground'>#--</div>
										</div>
										<div className='p-4 rounded-xl bg-card border border-border'>
											<div className='text-sm text-muted-foreground mb-1'>Referrals</div>
											<div className='text-2xl font-bold text-foreground'>0</div>
										</div>
									</div>
									<Button
										onClick={handleGetStarted}
										className='w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white'
										size='lg'
									>
										{user ? 'View Dashboard' : 'Get Started'}
										<ArrowRight className='w-4 h-4 ml-2' />
									</Button>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Trust & Security */}
			<section className='py-24 md:py-32 px-4 relative overflow-hidden bg-card/30'>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent' />
				
				<div className='relative max-w-6xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-5xl md:text-7xl font-heading mb-6 tracking-tight'>
							<span className='bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent'>
								Trust & Security
							</span>
						</h2>
						<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
							Built on transparency and verifiability. Every point, every reward, every transaction.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						{[
							{
								title: 'On-Chain Verification',
								description: 'All points and rewards are tracked transparently on-chain. No hidden mechanics.',
								icon: Shield,
								color: 'secondary'
							},
							{
								title: 'Fair Distribution',
								description: 'Equal opportunity for all. No whales, no manipulation. Pure merit-based rewards.',
								icon: BarChart3,
								color: 'primary'
							},
							{
								title: 'Secure & Private',
								description: 'Your data is protected with enterprise-grade security. Privacy first.',
								icon: CheckCircle2,
								color: 'accent'
							}
						].map((item, idx) => {
							const Icon = item.icon
							const getColorClasses = (color: string) => {
								switch (color) {
									case 'primary':
										return {
											bg: 'bg-primary/10',
											border: 'border-primary/20',
											text: 'text-primary'
										}
									case 'secondary':
										return {
											bg: 'bg-secondary/10',
											border: 'border-secondary/20',
											text: 'text-secondary'
										}
									case 'accent':
										return {
											bg: 'bg-accent/10',
											border: 'border-accent/20',
											text: 'text-accent'
										}
									default:
										return {
											bg: 'bg-muted/10',
											border: 'border-border',
											text: 'text-foreground'
										}
								}
							}
							const colorClasses = getColorClasses(item.color)
							return (
								<Card
									key={idx}
									className='group relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl'
								>
									<CardContent className='p-8 text-center'>
										<div className={`inline-flex p-4 rounded-xl ${colorClasses.bg} border ${colorClasses.border} mb-6 group-hover:scale-110 transition-transform duration-300`}>
											<Icon className={`w-6 h-6 ${colorClasses.text}`} />
										</div>
										<h3 className='text-xl font-heading mb-3 text-foreground'>
											{item.title}
										</h3>
										<p className='text-muted-foreground leading-relaxed'>
											{item.description}
										</p>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>
			</section>

			{/* Final CTA - Premium */}
			<section className='py-32 md:py-40 px-4 relative overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,151,167,0.15),transparent_70%)]' />
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(185,249,227,0.15),transparent_70%)]' />
				</div>
				
				<div className='relative max-w-5xl mx-auto text-center space-y-10'>
					<div className='space-y-6'>
						<h2 className='text-5xl md:text-8xl font-heading tracking-tight leading-tight'>
							<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
								Become the House
							</span>
						</h2>
						<p className='text-3xl md:text-4xl font-heading font-bold text-foreground'>
							The Edge is{' '}
							<span className='bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent'>
								Yours
							</span>
						</p>
					</div>
					<p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
						Join the waitlist and start earning points today. Early adopters get exclusive 
						access and bonus rewards when we launch.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Button
							size='lg'
							onClick={handleGetStarted}
							className='text-lg px-10 py-7 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white shadow-2xl shadow-secondary/30 hover:scale-105 active:scale-95 transition-all'
						>
							{user ? 'Go to Dashboard' : 'Join the Waitlist'}
							<ArrowRight className='w-5 h-5 ml-2' />
						</Button>
						<Link href='/about'>
							<Button
								variant='outline'
								size='lg'
								className='text-lg px-10 py-7 border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-card hover:border-border transition-all'
							>
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

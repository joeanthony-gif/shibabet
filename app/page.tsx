'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'

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

			{/* How It Works Section */}
			<section className='py-20 md:py-32 px-4 bg-card/30 relative overflow-hidden'>
				{/* Subtle background pattern */}
				<div className='absolute inset-0 opacity-[0.02]'>
					<div className='absolute inset-0' style={{
						backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
						backgroundSize: '50px 50px'
					}} />
				</div>

				<div className='relative max-w-6xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-6xl font-heading mb-4'>
							<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
								How It Works
							</span>
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Earn points, refer friends, and climb the leaderboard. Points convert to perks at launch.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						<Card className='border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/40 transition-all group hover:scale-105 hover:shadow-lg hover:shadow-primary/10'>
							<CardContent className='p-8 text-center space-y-4'>
								<div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>🎯</div>
								<h3 className='text-2xl font-heading text-primary'>
									Earn Points
								</h3>
								<p className='text-muted-foreground'>
									Get <strong className='text-foreground text-lg'>+5 points</strong> when
									you complete your profile. Start earning immediately!
								</p>
							</CardContent>
						</Card>

						<Card className='border-secondary/20 bg-gradient-to-br from-card to-secondary/5 hover:border-secondary/40 transition-all group hover:scale-105 hover:shadow-lg hover:shadow-secondary/10'>
							<CardContent className='p-8 text-center space-y-4'>
								<div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>👥</div>
								<h3 className='text-2xl font-heading text-secondary'>
									Refer Friends
								</h3>
								<p className='text-muted-foreground'>
									Share your unique link and earn{' '}
									<strong className='text-foreground text-lg'>+5 points</strong> for each
									friend who signs up and completes their profile.
								</p>
							</CardContent>
						</Card>

						<Card className='border-accent/20 bg-gradient-to-br from-card to-accent/5 hover:border-accent/40 transition-all group hover:scale-105 hover:shadow-lg hover:shadow-accent/10'>
							<CardContent className='p-8 text-center space-y-4'>
								<div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>🏆</div>
								<h3 className='text-2xl font-heading text-accent'>
									Climb the Leaderboard
								</h3>
								<p className='text-muted-foreground'>
									Compete with others and see your rank. Top performers get
									bonus perks at launch!
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Points Breakdown - Visual */}
			<section className='py-20 md:py-32 px-4 relative'>
				<div className='max-w-5xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-6xl font-heading mb-4'>
							<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
								Stack Points
							</span>
						</h2>
						<p className='text-lg text-muted-foreground'>
							Multiple ways to earn and maximize your points
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-6'>
						<div className='relative p-8 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 group'>
							<div className='absolute top-4 right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500' />
							<div className='relative'>
								<div className='text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300'>+5</div>
								<div className='text-lg font-semibold mb-2'>Signup Bonus</div>
								<div className='text-sm text-muted-foreground'>
									Complete your profile to get started
								</div>
							</div>
						</div>

						<div className='relative p-8 rounded-lg border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent backdrop-blur-sm hover:border-secondary/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 group'>
							<div className='absolute top-4 right-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500' />
							<div className='relative'>
								<div className='text-5xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300'>+5</div>
								<div className='text-lg font-semibold mb-2'>Per Referral</div>
								<div className='text-sm text-muted-foreground'>
									When they complete signup
								</div>
							</div>
						</div>

						<div className='relative p-8 rounded-lg border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm hover:border-accent/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 group'>
							<div className='absolute top-4 right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500' />
							<div className='relative'>
								<div className='text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300'>+1</div>
								<div className='text-lg font-semibold mb-2'>Loop Bonus</div>
								<div className='text-sm text-muted-foreground'>
									When referrals refer others
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What It Means Section */}
			<section className='py-20 md:py-32 px-4 bg-card/30 relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent' />
				
				<div className='relative max-w-6xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-6xl font-heading mb-4'>
							<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
								What It Means
							</span>
						</h2>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[
							{
								title: 'Deep Betting Liquidity',
								description: 'Earn unlimited points through referrals with no limits or constraints.',
								color: 'primary'
							},
							{
								title: 'Transparent & Secure',
								description: 'All points and rewards are tracked on-chain with full transparency.',
								color: 'secondary'
							},
							{
								title: 'Great Odds',
								description: 'Fair point distribution ensures everyone has a chance to climb the leaderboard.',
								color: 'accent'
							},
							{
								title: 'Capital Efficient',
								description: 'Maximize your points through strategic referrals and engagement.',
								color: 'primary'
							},
							{
								title: 'Transparent',
								description: 'All point calculations and leaderboard rankings are verifiable.',
								color: 'secondary'
							},
							{
								title: 'Entertainment',
								description: 'Token holders are part of every bet. This is engagement like we haven\'t seen before.',
								color: 'accent'
							}
						].map((feature, idx) => {
							const getColorClasses = (color: string) => {
								switch (color) {
									case 'primary':
										return {
											card: 'border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/40',
											title: 'text-primary'
										}
									case 'secondary':
										return {
											card: 'border-secondary/20 bg-gradient-to-br from-card to-secondary/5 hover:border-secondary/40',
											title: 'text-secondary'
										}
									case 'accent':
										return {
											card: 'border-accent/20 bg-gradient-to-br from-card to-accent/5 hover:border-accent/40',
											title: 'text-accent'
										}
									default:
										return {
											card: 'border-border bg-card',
											title: 'text-foreground'
										}
								}
							}
							const classes = getColorClasses(feature.color)
							return (
								<Card
									key={idx}
									className={`${classes.card} transition-all hover:scale-105 hover:shadow-lg group`}
									style={{
										animationDelay: `${idx * 100}ms`
									}}
								>
									<CardContent className='p-6'>
										<h3 className={`text-xl font-heading mb-3 ${classes.title} group-hover:scale-105 transition-transform duration-300`}>
											{feature.title}
										</h3>
										<p className='text-sm text-muted-foreground'>
											{feature.description}
										</p>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section className='py-20 md:py-32 px-4 relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,249,227,0.15),transparent_70%)] animate-pulse' />
				
				<div className='relative max-w-4xl mx-auto text-center space-y-8'>
					<h2 className='text-4xl md:text-6xl font-heading'>
						<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
							Token Holders Become the House
						</span>
					</h2>
					<p className='text-2xl md:text-3xl font-heading font-bold'>
						The Edge is{' '}
						<span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
							Yours
						</span>
					</p>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Join thousands of early adopters and start earning points today. 
						Points convert to perks when we launch.
					</p>
					<Button
						size='lg'
						onClick={handleGetStarted}
						className='text-lg px-12 py-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
					>
						{user ? 'Go to Dashboard' : 'Join the Waitlist'}
					</Button>
				</div>
			</section>
		</div>
	)
}

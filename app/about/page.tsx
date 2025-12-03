'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
	{ id: 'executive-summary', title: 'Executive Summary' },
	{ id: 'design-principles', title: 'System Design Principles' },
	{ id: 'core-mechanics', title: 'Tokenized Betting' },
	{ id: 'margin-model', title: 'Margin-Based Minting' },
	{ id: 'deflationary', title: 'Deflationary Dynamics' },
	{ id: 'wallet-architecture', title: 'Wallet & Transparency' },
	{ id: 'treasury-staking', title: 'Treasury & Staking' },
	{ id: 'bootstrapping', title: 'Bootstrapping' },
	{ id: 'risk-management', title: 'Risk Management' },
	{ id: 'ecosystem-utility', title: 'Ecosystem Utility' },
	{ id: 'liquidity', title: 'Deep Liquidity' },
	{ id: 'enhancements', title: 'Future Enhancements' },
	{ id: 'closing', title: 'Summary' },
]

export default function AboutPage() {
	const [activeSection, setActiveSection] = useState('executive-summary')

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 200

			for (const section of sections) {
				const element = document.getElementById(section.id)
				if (element) {
					const offsetTop = element.offsetTop
					const offsetBottom = offsetTop + element.offsetHeight

					if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
						setActiveSection(section.id)
						break
					}
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<main className='min-h-screen bg-background p-4 sm:p-6'>
			<div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8'>
				{/* Left Navigation */}
				<aside className='w-full md:w-64 flex-shrink-0'>
					<div className='sticky top-8'>
						<Card>
							<CardContent className='p-4'>
								<nav className='space-y-2' aria-label='Page sections'>
									{sections.map((section) => (
										<button
											key={section.id}
											onClick={() => scrollToSection(section.id)}
											aria-current={activeSection === section.id ? 'page' : undefined}
											className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background ${
												activeSection === section.id
													? 'bg-secondary/10 text-secondary font-medium'
													: 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
											}`}
										>
											{section.title}
										</button>
									))}
								</nav>
							</CardContent>
						</Card>
					</div>
				</aside>

				{/* Main Content */}
				<div className='flex-1 space-y-8'>
					<div>
						<h1 className='text-4xl font-heading tracking-wide mb-4'>About Shibabet</h1>
						<p className='text-muted-foreground'>
							A new infrastructure model for sports betting — transparent, margin-aware, and aligned with token holders, bettors, and ecosystem contributors.
						</p>
					</div>

					{/* 1. Executive Summary */}
					<section id='executive-summary' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Executive Summary</h2>
								<div className='space-y-4 text-muted-foreground'>
									<p>
										This paper presents a new infrastructure model for sports betting—one that is transparent, margin-aware, and aligned with token holders, bettors, and ecosystem contributors. At the core of this system is a purpose-built token that serves as the unit of account for all bets.
									</p>
									<p>
										When a user places a bet, their tokens are burned. If they win, new tokens are minted to pay out their winnings. A small, additional amount is minted based on the margin embedded in the odds and distributed to liquidity providers, stakers, the protocol treasury, and incentive programs. The design is capital-efficient, deflationary, and transparent by default.
									</p>
									<p>
										Unlike traditional sportsbooks, which take directional risk and rely on internal balance sheets, this model does not speculate. Instead, it facilitates betting and redistributes the margin—fairly and programmatically—through a controlled mint mechanism.
									</p>
									
									<div className='mt-6 space-y-4'>
										<h3 className='font-semibold text-foreground'>Why This Matters for Users</h3>
										<div className='grid md:grid-cols-2 gap-4'>
											<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
												<h4 className='font-medium text-foreground mb-2'>Deeper Betting Liquidity</h4>
												<p className='text-sm'>
													Because the platform does not rely on a fixed capital pool or balance sheet, it can accept high-volume bets without exposure constraints. Payouts are minted only when needed, allowing users to place large bets without limits imposed by operator risk appetite.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
												<h4 className='font-medium text-foreground mb-2'>Transparent and Efficient Pricing</h4>
												<p className='text-sm'>
													Odds are structured to balance the book, not extract maximum profit. The platform is not incentivized to "fade" the public or manage directional risk—resulting in pricing that reflects actual probabilities and betting activity.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
												<h4 className='font-medium text-foreground mb-2'>Predictable Token Liquidity</h4>
												<p className='text-sm'>
													While betting liquidity is uncapped, the platform also incentivizes token liquidity through decentralized exchanges. This ensures that users can enter or exit the token with minimal slippage, enhancing the usability of the token without destabilizing its value.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
												<h4 className='font-medium text-foreground mb-2'>Verifiable Reward Mechanics</h4>
												<p className='text-sm'>
													Token flows, bet outcomes, and ecosystem distributions are all transparent and auditable on-chain.
												</p>
											</div>
										</div>
									</div>

									<div className='mt-6'>
										<h3 className='font-semibold text-foreground mb-3'>Ecosystem Value</h3>
										<p>
											Unlike inflation-driven token models, this system mints tokens strictly based on platform margin—the difference between fair odds and odds offered. Emissions scale with usage, not promises. A portion of every mint is also burned, ensuring long-term deflationary pressure as volume grows.
										</p>
										<p className='mt-3'>
											To bootstrap adoption, the token is first introduced as a loyalty reward within a traditional sportsbook. Users accumulate tokens through normal betting activity, while a limited portion of the supply is offered for sale from the treasury at a progressively increasing price. This approach seeds the token economy with real users, predictable pricing and real value backing the token via the treasury—without speculative overhang.
										</p>
										<p className='mt-3 font-medium text-foreground'>
											The result is a sportsbook that is:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Transparent in odds, payouts, and token flows</li>
											<li>Capital-efficient and able to scale betting volume without financial risk</li>
											<li>User-aligned, offering fair payouts and permissionless liquidity</li>
											<li>Deflationary, with supply shrinking as usage grows</li>
											<li>Sustainable, with every incentive rooted in real activity</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 2. System Design Principles */}
					<section id='design-principles' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>System Design Principles</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										This betting infrastructure is built around five core principles, each reinforcing the system's transparency, sustainability, and user alignment. These are not just economic guardrails — they represent a structural shift from traditional sportsbooks, removing capital constraints and embedding fairness and accountability at the protocol level.
									</p>
									
									<div className='space-y-4'>
										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>1. Margin-Constrained Minting</h3>
											<p>
												All token issuance is capped by the embedded margin in betting odds. The platform earns its margin through the spread between fair odds and those offered (e.g. offering 1.91 instead of 2.00 on a 50/50 market). This margin funds:
											</p>
											<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
												<li>Protocol rewards to stakers and liquidity providers</li>
												<li>Growth incentives and treasury accumulation</li>
												<li>Referral bonuses and user engagement</li>
												<li>And critically, a burn component that reinforces token scarcity</li>
											</ul>
											<p className='mt-2'>
												No tokens are minted arbitrarily. Every emission must be backed by real user activity and platform edge.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>2. Burn-on-Bet, Mint-on-Win</h3>
											<p>
												Tokens are burned at the time of betting, regardless of outcome. If the user loses, the tokens remain permanently removed from circulation. If the user wins, tokens are minted to cover their full payout, along with a small amount of additional tokens distributed to the ecosystem.
											</p>
											<p className='mt-2'>
												This structure has two major benefits:
											</p>
											<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
												<li>The platform operates without a balance sheet, enabling uncapped betting volume</li>
												<li>Users face no payout risk — rewards are minted programmatically and immediately, independent of treasury balances or capital buffers</li>
											</ul>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>3. Liability Risk Minimization</h3>
											<p>
												Unlike traditional sportsbooks that take directional positions or tolerate skewed exposure based on sentiment, this platform seeks to balance total liability across outcomes.
											</p>
											<p className='mt-2'>
												By aiming to keep expected payouts relatively even regardless of outcome, the system minimizes spikes in minting or burning — ensuring smoother token flow, more consistent deflation, and predictable economic dynamics. As a result, the odds offered may differ from traditional operators, reflecting a desire for balance rather than speculative edge-taking whilst also providing a point of differentiation from the majority of sportsbooks that rely on only a handful of data providers.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>4. Token Supply Reduction Systematically Tied to Platform Usage</h3>
											<p>
												The more users bet, the more tokens are burned — either directly (via losing bets) or indirectly (via the burned portion of mint emissions). Although winners receive freshly minted tokens, the system ensures that over time, total supply trends downward as long as the embedded margin exceeds the token issuance tied to it.
											</p>
											<p className='mt-2'>
												This makes the token model fundamentally different from inflationary ecosystems. Here, usage and deflation scale together, aligning long-term token value with real platform engagement.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>5. Transparency by Default</h3>
											<p>
												All minting, burning, and reward distributions are verifiable on-chain. Even in a custodial user experience, every wallet is tied to an address, and every event is traceable.
											</p>
											<p className='mt-2'>
												Anyone — users, auditors, community members — can confirm:
											</p>
											<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
												<li>How much has been bet</li>
												<li>How much has been minted</li>
												<li>How rewards are allocated across the ecosystem</li>
											</ul>
											<p className='mt-2'>
												This removes the need for trust in the operator and reinforces a core promise of the platform: fair odds, transparent outcomes, and sustainable mechanics.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 3. Tokenized Betting: Core Mechanics */}
					<section id='core-mechanics' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Tokenized Betting: Core Mechanics</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										The platform uses a single native token as the currency for all bets. Each user is assigned or connects a dedicated wallet, and all token flows — including bet burns, payouts, and rewards — occur through this wallet and are executed on-chain. While the bet logic itself (e.g. determining winners, resolving outcomes) is handled off-chain for performance, each bet is recorded on-chain in a lightweight, transparent format. This ensures that every bet can be publicly verified, without sacrificing speed or user experience.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Bet Lifecycle</h3>
										<div className='space-y-4'>
											<div className='flex gap-4'>
												<div className='flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary'>
													1
												</div>
												<div>
													<p className='font-medium text-foreground'>User places a bet</p>
													<p className='text-sm mt-1'>
														Tokens are immediately burned from the user's wallet. The platform emits an on-chain event containing key bet metadata:
													</p>
													<ul className='list-disc list-inside space-y-1 mt-2 ml-4 text-sm'>
														<li>Market ID (e.g. "EPL2025-MANLIV-001")</li>
														<li>Market type (e.g. "Match Winner")</li>
														<li>Outcome selected (e.g. "Team A wins")</li>
														<li>Stake amount</li>
														<li>Odds offered</li>
														<li>Timestamp</li>
													</ul>
												</div>
											</div>
											<div className='flex gap-4'>
												<div className='flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary'>
													2
												</div>
												<div>
													<p className='font-medium text-foreground'>Outcome is resolved off-chain</p>
													<p className='text-sm mt-1'>
														A trusted oracle verifies the event result. The platform determines whether the user won or lost.
													</p>
												</div>
											</div>
											<div className='flex gap-4'>
												<div className='flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary'>
													3
												</div>
												<div>
													<p className='font-medium text-foreground'>Settlement</p>
													<ul className='list-disc list-inside space-y-1 mt-1 ml-4 text-sm'>
														<li>If the user loses: no mint occurs</li>
														<li>If the user wins: tokens are minted to pay the full winnings</li>
														<li>A small, additional mint based on platform margin is distributed to the ecosystem, with a portion burned again to ensure deflationary pressure</li>
													</ul>
													<p className='text-sm mt-2'>
														All token movements — including burns, payouts, and reward distributions — are visible on-chain, and tied to the user's wallet.
													</p>
												</div>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Worked Example</h3>
										<div className='p-4 rounded-lg bg-card border border-border space-y-4'>
											<div>
												<p className='font-medium text-foreground mb-2'>Inputs:</p>
												<div className='grid grid-cols-2 gap-2 text-sm'>
													<span className='text-muted-foreground'>Bet:</span>
													<span className='font-medium text-foreground'>100 tokens</span>
													<span className='text-muted-foreground'>Odds offered:</span>
													<span className='font-medium text-foreground'>1.91</span>
													<span className='text-muted-foreground'>Fair odds:</span>
													<span className='font-medium text-foreground'>2.00</span>
													<span className='text-muted-foreground'>Margin:</span>
													<span className='font-medium text-foreground'>9 tokens</span>
												</div>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>If the user loses:</p>
												<ul className='text-sm space-y-1 ml-4 list-disc'>
													<li>100 tokens burned</li>
													<li>No mint occurs</li>
													<li>→ Net supply change = -100 tokens</li>
												</ul>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>If the user wins:</p>
												<ul className='text-sm space-y-1 ml-4 list-disc mb-3'>
													<li>191 tokens minted for payout</li>
													<li>9 tokens minted from margin, allocated as follows:</li>
												</ul>
												<div className='overflow-x-auto'>
													<table className='w-full text-sm border-collapse'>
														<thead>
															<tr className='border-b border-border'>
																<th className='text-left p-2'>Allocation</th>
																<th className='text-right p-2'>%</th>
																<th className='text-right p-2'>Tokens</th>
															</tr>
														</thead>
														<tbody>
															<tr className='border-b border-border/50'>
																<td className='p-2'>Burned</td>
																<td className='text-right p-2'>30%</td>
																<td className='text-right p-2 font-medium text-foreground'>2.7</td>
															</tr>
															<tr className='border-b border-border/50'>
																<td className='p-2'>Treasury</td>
																<td className='text-right p-2'>20%</td>
																<td className='text-right p-2 font-medium text-foreground'>1.8</td>
															</tr>
															<tr className='border-b border-border/50'>
																<td className='p-2'>Liquidity Providers</td>
																<td className='text-right p-2'>30%</td>
																<td className='text-right p-2 font-medium text-foreground'>2.7</td>
															</tr>
															<tr className='border-b border-border/50'>
																<td className='p-2'>Stakers</td>
																<td className='text-right p-2'>10%</td>
																<td className='text-right p-2 font-medium text-foreground'>0.9</td>
															</tr>
															<tr>
																<td className='p-2'>Incentives</td>
																<td className='text-right p-2'>10%</td>
																<td className='text-right p-2 font-medium text-foreground'>0.9</td>
															</tr>
														</tbody>
													</table>
												</div>
												<p className='text-sm mt-3'>
													Total Minted: 197.3 (191 + 9 - 2.7)
												</p>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>Net Effect Over Time</p>
												<p className='text-sm'>
													Because each outcome in this case has a 50% chance of occurring, the burned component of the margin drives deflationary pressures over time. If user loses: -100 burned. If user wins: 97.3 minted. Net: -2.7 removed.
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Variance and Deflation Over Time</h3>
										<p>
											While winning bets increase token supply, the system is designed to be deflationary in aggregate:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Losing bets burn 100% of their stake</li>
											<li>Winning bets mint the required payout plus a capped margin, a portion of which is burned</li>
											<li>As long as the embedded margin is greater than the reward emissions, net deflation occurs over time</li>
										</ul>
										<p className='mt-3'>
											However, this does not happen on every bet. There is natural variance. If too many users win a specific market, minting may temporarily exceed burning. To manage this, the platform focuses on balancing liability across outcomes. By encouraging even expected payouts, the system minimizes spikes in minting or burning. This smooths token dynamics and strengthens the long-term deflationary curve.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Transparency Without Friction</h3>
										<p>
											As mentioned, when a user places a bet the platform emits an on-chain event containing key bet metadata. The lightweight on-chain bet log ensures:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Every bet is publicly recorded and tied to a wallet</li>
											<li>Stake amounts, odds, and markets are auditable</li>
											<li>Token flow remains fully transparent without adding friction to the betting process</li>
										</ul>
										<p className='mt-3'>
											Future versions may build on this by introducing NFT bet receipts or full on-chain bet state for additional composability, user engagement, or gamification.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 4. Margin-Based Minting Model */}
					<section id='margin-model' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Margin-Based Minting Model</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										The platform's token economy is powered entirely by its embedded margin—the difference between the true (or "fair") odds and the odds offered to users. Unlike fixed-reward models that emit tokens on a schedule or per transaction, this system is designed to mint only what is economically justified by platform activity.
									</p>
									<p>
										This ensures that token emissions are:
									</p>
									<ul className='list-disc list-inside space-y-1 ml-4'>
										<li>Proportional to actual usage</li>
										<li>Bounded by real margin revenue</li>
										<li>Flexible across different market conditions</li>
										<li>And sustainable over the long term</li>
									</ul>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>How It Works</h3>
										<p>
											Every time a user wins a bet, the system must mint tokens to pay their winnings. In addition to that, a small amount of tokens—equal to the platform's house margin—is minted and distributed to various stakeholders which also incorporates a burn component.
										</p>
										<p className='mt-2'>
											This margin is calculated as:
										</p>
										<div className='p-4 rounded-lg bg-card border border-border my-3'>
											<p className='font-mono text-foreground text-center'>
												Margin = (Fair Odds - Offered Odds) × Stake
											</p>
										</div>
										<p>
											That margin determines the maximum clip available to be minted for the ecosystem. This means:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Rewards never exceed what the platform has earned</li>
											<li>The system can adapt to both low-margin and high-margin markets</li>
											<li>Emissions scale with volume, not time</li>
										</ul>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Example A: High-Margin Market</h3>
										<div className='p-4 rounded-lg bg-card border border-border space-y-3'>
											<div>
												<p className='font-medium text-foreground mb-2'>Parameters:</p>
												<div className='grid grid-cols-2 gap-2 text-sm'>
													<span className='text-muted-foreground'>Fair odds:</span>
													<span className='font-medium text-foreground'>2.00</span>
													<span className='text-muted-foreground'>Offered odds:</span>
													<span className='font-medium text-foreground'>1.91</span>
													<span className='text-muted-foreground'>Stake:</span>
													<span className='font-medium text-foreground'>100 tokens</span>
													<span className='text-muted-foreground'>Margin:</span>
													<span className='font-medium text-foreground'>9 tokens</span>
												</div>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>Mint Distribution (on a winning bet):</p>
												<ul className='text-sm space-y-1 ml-4 list-disc'>
													<li>191 tokens minted to pay the winner</li>
													<li>9 tokens minted from margin</li>
													<li>30% of the margin clip is burned (2.7 tokens)</li>
												</ul>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>Net effect:</p>
												<ul className='text-sm space-y-1 ml-4 list-disc'>
													<li>100 tokens burned on bet</li>
													<li>200 tokens minted</li>
													<li>2.7 tokens immediately re-burned</li>
												</ul>
												<p className='text-sm mt-2 italic'>
													The net supply expands by 97.3 tokens in this instance, but long-term deflation is preserved as losing bets accumulate and margin-driven emissions remain capped.
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Example B: Low-Margin Market</h3>
										<div className='p-4 rounded-lg bg-card border border-border space-y-3'>
											<div>
												<p className='font-medium text-foreground mb-2'>Parameters:</p>
												<div className='grid grid-cols-2 gap-2 text-sm'>
													<span className='text-muted-foreground'>Fair odds:</span>
													<span className='font-medium text-foreground'>2.00</span>
													<span className='text-muted-foreground'>Offered odds:</span>
													<span className='font-medium text-foreground'>1.98</span>
													<span className='text-muted-foreground'>Stake:</span>
													<span className='font-medium text-foreground'>100 tokens</span>
													<span className='text-muted-foreground'>Margin:</span>
													<span className='font-medium text-foreground'>2 tokens</span>
												</div>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>Mint Distribution (on a winning bet):</p>
												<ul className='text-sm space-y-1 ml-4 list-disc'>
													<li>198 tokens minted to pay the winner</li>
													<li>2 tokens minted from margin</li>
													<li>0.6 tokens burned (30% of margin)</li>
												</ul>
											</div>
											<div className='pt-3 border-t border-border'>
												<p className='font-medium text-foreground mb-2'>Net effect:</p>
												<ul className='text-sm space-y-1 ml-4 list-disc'>
													<li>Supply impact is smaller due to lower margin</li>
													<li>Burn component scales with margin</li>
												</ul>
												<p className='text-sm mt-2 italic'>
													Rewards are lower, but aligned with the reduced platform take. The system remains price competitive and sustainable, even in tight-margin events.
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Why This Model Matters</h3>
										<p>
											This structure creates a range of important benefits:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li><strong className='text-foreground'>Scalable:</strong> Works across niche high-margin markets and competitive low-margin ones like NBA.</li>
											<li><strong className='text-foreground'>Efficient:</strong> Token emissions are tightly coupled to platform profitability</li>
											<li><strong className='text-foreground'>Deflationary by design:</strong> As long as margin &gt; reward clip and most users lose (as is statistically expected with a margin), the system reduces net supply</li>
											<li><strong className='text-foreground'>Incentive-aligned:</strong> Participants earn more only when the platform earns more</li>
										</ul>
										<p className='mt-3'>
											In traditional token models, maintaining staking rewards or LP incentives in low-margin environments often requires subsidies or artificial inflation. Here, no such external subsidy is needed. The system balances itself organically, with emissions directly reflecting the margin environment.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 5. Deflationary Supply Dynamics */}
					<section id='deflationary' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Deflationary Supply Dynamics</h2>
								<div className='space-y-4 text-muted-foreground'>
									<p>
										While the token system is designed to expand as needed to pay winners, it structurally trends toward net supply reduction as betting volume increases and margin is realized. This supply tightening creates meaningful value capture for long-term token holders and ecosystem participants.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Deflation as Value Distribution</h3>
										<p>
											In this model a portion of the house edge is burned, reinforcing the system's deflationary bias.
										</p>
										<p className='mt-2'>
											Over time, this means that:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>More tokens are burned than minted, as betting volume drives deflation.</li>
											<li>Thus the token supply contracts, even as usage scales</li>
											<li>This creates a value loop where holding the token becomes more attractive</li>
										</ul>
										<p className='mt-3'>
											Importantly, deflation doesn't just benefit the system — it benefits every token holder. As supply tightens and usage grows:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Token scarcity increases</li>
											<li>Value is captured by the ecosystem rather than extracted by the operator</li>
											<li>Users who hold tokens (e.g. stakers, LPs, bettors who win and retain rewards) are proportionally rewarded</li>
										</ul>
										<p className='mt-3'>
											In effect, users collectively earn a portion of the house edge — simply by participating in a system designed to grow leaner as it grows larger.
										</p>
									</div>

									<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
										<h3 className='font-semibold text-foreground mb-2'>Summary</h3>
										<ul className='list-disc list-inside space-y-1 text-sm'>
											<li>Deflation is an output of economic design, not an artificial cap</li>
											<li>It serves as a mechanism for protocol-level value sharing</li>
											<li>As betting volume grows, token supply tightens, and token holders benefit</li>
											<li>This model aligns the interests of the platform, its users, and the token economy — making the token not just functional, but fundamentally valuable</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 6. Wallet Architecture & Transparency */}
					<section id='wallet-architecture' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Wallet Architecture & Transparency</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										A cornerstone of the platform's integrity is its commitment to transparent token flow and user-level accountability. Every user account is tied to a wallet, and all token movements — including bets, burns, payouts, rewards, and staking — are executed through that wallet on-chain.
									</p>
									<p>
										This structure enables:
									</p>
									<ul className='list-disc list-inside space-y-1 ml-4'>
										<li>Public verification of user activity</li>
										<li>Consistent attribution of rewards and leaderboard rankings</li>
										<li>Optional user self-custody, without compromising usability</li>
									</ul>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Custodial by Default, Linkable by Design</h3>
										<p>
											To streamline onboarding, wallets are custodial by default — created and managed by the platform on behalf of each user. This ensures:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Gas is handled behind the scenes</li>
											<li>UX remains frictionless (no wallet pop-ups or failed transactions)</li>
											<li>Token transactions still occur on-chain, tied to the user's wallet</li>
										</ul>
										<p className='mt-3'>
											Advanced users may optionally link their own external wallet at any time. Once linked:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Rewards can be withdrawn directly</li>
											<li>Staking and governance (if introduced) can be managed autonomously</li>
											<li>All on-chain activity remains verifiable by third parties</li>
										</ul>
										<p className='mt-3'>
											Each wallet, whether platform-created or user-linked, serves as the anchor for transparency.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>On-Chain Bet Logging</h3>
										<p>
											While bet logic is resolved off-chain, each bet is recorded on-chain via an event, which includes:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Market ID</li>
											<li>Selected outcome</li>
											<li>Stake amount</li>
											<li>Odds offered</li>
											<li>Timestamp</li>
											<li>Wallet address</li>
										</ul>
										<p className='mt-3'>
											These event logs are:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Publicly auditable</li>
											<li>Indexed for leaderboards, analytics, and history</li>
											<li>Lightweight (no stored state), minimizing gas costs</li>
										</ul>
										<p className='mt-3'>
											This allows the platform to retain high-speed resolution and settlement, while giving users and observers full visibility into the betting ecosystem.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Fair Attribution and Abuse Prevention</h3>
										<p>
											With a 1:1 relationship between users and wallets, the system can:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Track cumulative betting activity</li>
											<li>Attribute rewards (like staking multipliers or referral bonuses) accurately</li>
											<li>Prevent abuse (e.g. creating multiple wallets to farm incentives)</li>
										</ul>
										<p className='mt-3'>
											If users change wallets, the system maintains a record of historical associations, so full betting history and attribution remain intact.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Leaderboards and Trust Layers</h3>
										<p>
											This wallet-based architecture supports features like:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Monthly betting competitions</li>
											<li>Volume or burn-based rankings</li>
											<li>Gamified referral programs</li>
											<li>Reputation systems for high-skill or high-volume users</li>
										</ul>
										<p className='mt-3'>
											All of this is built on-chain — no need for trust, no hidden data, and no reliance on opaque internal databases.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 7. Treasury, Staking, and Liquidity Incentives */}
					<section id='treasury-staking' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Treasury, Staking, and Liquidity Incentives</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										The House edge that is minted alongside winning bets is not taken by the operator but instead, it is distributed across the ecosystem to incentivize usage, deepen liquidity, and reward participation — with a portion burned to reinforce deflation.
									</p>
									<p>
										The distribution is defined as a percentage of the platform's embedded margin, ensuring that emissions are directly tied to platform activity and aligned with its economic output.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Standard Distribution Breakdown</h3>
										<div className='overflow-x-auto'>
											<table className='w-full text-sm border-collapse'>
												<thead>
													<tr className='border-b border-border'>
														<th className='text-left p-3'>Recipient</th>
														<th className='text-right p-3'>% of Margin Mint</th>
													</tr>
												</thead>
												<tbody>
													<tr className='border-b border-border/50'>
														<td className='p-3 font-medium text-foreground'>Burned</td>
														<td className='text-right p-3 font-semibold text-secondary'>30%</td>
													</tr>
													<tr className='border-b border-border/50'>
														<td className='p-3 font-medium text-foreground'>Treasury</td>
														<td className='text-right p-3 font-semibold text-secondary'>30%</td>
													</tr>
													<tr className='border-b border-border/50'>
														<td className='p-3 font-medium text-foreground'>Liquidity Providers</td>
														<td className='text-right p-3 font-semibold text-secondary'>30%</td>
													</tr>
													<tr>
														<td className='p-3 font-medium text-foreground'>Stakers</td>
														<td className='text-right p-3 font-semibold text-secondary'>10%</td>
													</tr>
												</tbody>
											</table>
										</div>
										<p className='text-sm mt-4 italic'>
											These percentages reflect a balanced starting point — but they are not fixed indefinitely.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Dynamic Allocation Through Governance</h3>
										<p>
											As the platform matures, market conditions will shift:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Liquidity on exchanges may deepen to the point where additional LP incentives become inconsequential.</li>
											<li>The treasury may grow large enough to cover multi-year operations</li>
											<li>Burn levels may need to be adjusted to accelerate deflation</li>
										</ul>
										<p className='mt-3'>
											To respond to these changes, the system may introduce governance-driven allocation adjustments, allowing token holders to vote on redistributing the margin mint across these categories.
										</p>
										<p className='mt-2'>
											For example:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Reducing LP incentives if liquidity is abundant</li>
											<li>Redirecting emissions toward burn or staking</li>
											<li>Temporarily increasing growth incentives during a user acquisition push</li>
											<li>Capping treasury allocation if funding is already sufficient</li>
										</ul>
										<p className='mt-3'>
											This allows the system to remain responsive without undermining its core constraints:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>All emissions are still margin-bound</li>
											<li>No arbitrary inflation is introduced</li>
											<li>The incentive model remains tightly coupled to usage</li>
										</ul>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Incentive Components (Initial)</h3>
										<div className='space-y-3'>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>1. Treasury (30%)</h4>
												<p className='text-sm'>
													Supports protocol development, marketing, partnerships, and reserve capital.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>2. Liquidity Providers (30%)</h4>
												<p className='text-sm'>
													Rewards those who make it easy for users to buy/sell the token without slippage.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>3. Stakers (10%)</h4>
												<p className='text-sm'>
													Provides yield to long-term holders who help reduce circulating supply.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>4. Burn (30%)</h4>
												<p className='text-sm'>
													Permanently removes supply, ensuring long-term deflation and value capture.
												</p>
											</div>
										</div>
										<p className='mt-4'>
											This dynamic structure gives the system a robust foundation — with the flexibility to evolve intelligently, guided by the same community that benefits from its success.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 8. Bootstrapping */}
					<section id='bootstrapping' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Bootstrapping: Loyalty Distribution and Treasury Sale</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										Launching a token ecosystem requires careful sequencing to build utility, demand, and sustainability. This platform's bootstrapping model uses an incremental rollout, grounded in real usage and aligned with long-term value creation — with betting as the first utility, not the final stage.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
											<span className='w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold text-sm'>1</span>
											Phase 1: Token as Loyalty Incentive (Traditional Betting Model)
										</h3>
										<div className='ml-10 space-y-2'>
											<p>
												Initially, users bet on the existing sportsbook. In parallel, they begin earning "points" as a loyalty reward, based on their activity.
											</p>
											<ul className='list-disc list-inside space-y-1 ml-4'>
												<li>Points are distributed based on betting volume and other incentive mechanisms like referrals.</li>
												<li>They are accumulated on the user's account over time.</li>
												<li>Initially, the points cannot yet be bought or sold, but can be accumulated and tracked</li>
												<li>Points will convert to tokens and be visible on-chain via the user's linked wallet at the end of phase 1.</li>
											</ul>
											<p>
												This stage allows users to:
											</p>
											<ul className='list-disc list-inside space-y-1 ml-4'>
												<li>Familiarize themselves with the token</li>
												<li>Accumulate future utility without risk</li>
												<li>Become stakeholders in the upcoming ecosystem shift</li>
											</ul>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
											<span className='w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold text-sm'>2</span>
											Phase 2: Betting in the Token Begins
										</h3>
										<div className='ml-10 space-y-2'>
											<p>
												Once a sufficient user base has accumulated tokens, the platform will enable betting in the token directly, even if liquidity is not yet deep on exchanges.
											</p>
											<ul className='list-disc list-inside space-y-1 ml-4'>
												<li>Users can place bets using the token</li>
												<li>The system's burn-on-bet, mint-on-win mechanics activate</li>
												<li>Margin-based rewards begin flowing to the ecosystem.</li>
												<li>Initially rewards may accumulate for a period of time to maximize incentives on launch (future details will be provided)</li>
											</ul>
											<p>
												This activity kickstarts the token economy and creates the core value loop
											</p>
											<p className='italic'>
												In this model, betting comes before liquidity — because it is betting that gives the token its value. This approach prioritizes usage over speculation and allows for an accelerated rewards profile as the platform grows in its initial usage.
											</p>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
											<span className='w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold text-sm'>3</span>
											Phase 3: Staking, LP Incentives, and Treasury Sale
										</h3>
										<div className='ml-10 space-y-2'>
											<p>
												With token betting active and usage growing, the platform introduces additional layers to deepen the economy:
											</p>
											<ul className='list-disc list-inside space-y-1 ml-4'>
												<li><strong className='text-foreground'>Staking:</strong> Users can lock tokens to earn a portion of margin rewards</li>
												<li><strong className='text-foreground'>Liquidity Provision:</strong> Incentives are introduced for LPs on decentralized exchanges</li>
												<li><strong className='text-foreground'>Treasury Sale:</strong> A controlled portion of the total supply is sold at a gradually increasing price, providing:
													<ul className='list-disc list-inside space-y-1 mt-1 ml-6'>
														<li>Early price discovery</li>
														<li>Initial liquidity</li>
														<li>Treasury funding for long-term growth</li>
													</ul>
												</li>
											</ul>
											<p>
												The treasury sale is finite. Once complete, all tokens in circulation must be either earned (via betting or staking) or purchased from other users.
											</p>
										</div>
									</div>

									<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
										<h3 className='font-semibold text-foreground mb-2'>Why This Sequencing Works</h3>
										<ul className='list-disc list-inside space-y-1 text-sm'>
											<li><strong className='text-foreground'>Utility-first:</strong> Token use begins with betting, not speculation</li>
											<li><strong className='text-foreground'>Deflation engine activated early:</strong> Burns begin before emissions scale</li>
											<li><strong className='text-foreground'>Liquidity grows with demand:</strong> LPs are incentivized only once there's betting volume</li>
											<li><strong className='text-foreground'>Avoids circular speculation:</strong> Value is tied to economic flow, not emissions</li>
										</ul>
										<p className='text-sm mt-3'>
											By prioritizing real usage from day one, the system builds a healthier foundation for both token value and user engagement.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 9. Risk Management */}
					<section id='risk-management' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Risk Management Reimagined: Balancing Liability in a Token-Based Sportsbook</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										In traditional sportsbooks, risk management is centered on capital. Operators take directional exposure, manage reserves, and shape odds based on sentiment and expected bettor behavior. Profitability often hinges on predicting user mistakes and exploiting public biases.
									</p>
									<p>
										This platform adopts a fundamentally different approach — one that eliminates operator risk and instead builds risk management into the protocol itself.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>From Capital Exposure to Protocol-Based Logic</h3>
										<p>
											The system does not maintain a balance sheet, nor does it need to. Instead:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>All bets are burned immediately at the time of placement</li>
											<li>Payouts are minted on winning outcomes</li>
											<li>Margin-based emissions fund rewards and incentives</li>
											<li>User funds connect directly to a wallet, and no treasury is needed to cover outcomes</li>
										</ul>
										<p className='mt-3'>
											This architecture means the platform takes no directional risk, and payouts are programmatic. As long as the system retains an edge via embedded margin, it can scale indefinitely without increasing operational exposure.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Liability Balancing</h3>
										<p>
											What matters in this model is not how many users bet on each side, but how much liability each side represents.
										</p>
										<p className='mt-2'>
											The platform dynamically adjusts odds to maintain balanced expected payouts across all outcomes:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>If one outcome accumulates significantly more liability than the other(s), odds are shifted to incentivize new bets that help rebalance the book</li>
											<li>This is done not to "hedge" risk, but to minimize unpredictable minting spikes</li>
											<li>Importantly, total bet volume can be highly uneven, but if the odds properly reflect it, liability can remain balanced</li>
										</ul>
										<p className='mt-3'>
											By focusing on liability rather than sentiment or positioning, the platform maintains stable margin capture and avoids the sharp supply volatility that might otherwise occur if one side of a market wins disproportionately.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Protocol-Level Risk Benefits</h3>
										<div className='space-y-3'>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>1. Uncapped Scalability</h4>
												<p className='text-sm'>
													The platform can process large volumes of betting without additional reserves or hedging structures. Payouts are minted only when owed.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>2. Predictable Token Flows</h4>
												<p className='text-sm'>
													By balancing liability, the system reduces variance in minting and deflation. Token supply becomes smoother and easier to forecast over time.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>3. User-Aligned Economics</h4>
												<p className='text-sm'>
													The protocol doesn't profit from user losses. It profits from usage — and the more balanced the book, the more consistent the margin realization.
												</p>
											</div>
											<div className='p-4 rounded-lg bg-card border border-border'>
												<h4 className='font-medium text-foreground mb-1'>4. Incentive Consistency</h4>
												<p className='text-sm'>
													Odds exist to manage liability, not to "trap" bettors. This reduces adversarial dynamics and builds long-term trust with users.
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Residual Risk and Ecosystem Distribution</h3>
										<p>
											While operator-level risk is eliminated, economic variance still exists:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>One-sided outcomes can still result in temporary supply expansions</li>
											<li>Over time, this is offset by consistent margin capture and burn mechanics</li>
											<li>Staking and liquidity incentives are structured to distribute risk and reward across the ecosystem — reinforcing alignment among bettors, token holders, and protocol participants</li>
										</ul>
										<p className='mt-3'>
											In this model, risk doesn't disappear — it is simply reengineered into the protocol layer, where it becomes manageable, auditable, and predictable.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 10. Ecosystem Utility */}
					<section id='ecosystem-utility' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Ecosystem Utility: A Hedging Layer for the Broader Gambling Industry</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										While this platform is designed to operate as a self-contained sportsbook, its structure offers a much broader utility: it can act as a transparent, decentralized risk settlement layer for the wider gambling ecosystem.
									</p>
									<p>
										As the token economy matures and liquidity deepens, the protocol can be used by other sportsbooks and operators to hedge their exposure — without relying on traditional counterparties or OTC arrangements.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>The Problem with Traditional Risk Sharing</h3>
										<p>
											In the current gambling industry:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Smaller sportsbooks or new operators often face exposure limits</li>
											<li>Hedging is done through partnerships, intermediaries, or inefficient exchanges</li>
											<li>Counterparty risk, pricing opacity, and delays make it difficult to scale effectively</li>
										</ul>
										<p className='mt-3'>
											These problems are especially acute during high-stakes or emotionally driven events, where one-sided betting behavior creates significant risk.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>The Protocol as a Risk Management Tool</h3>
										<p>
											This system offers a solution:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Liquidity is available programmatically, not through manual negotiation</li>
											<li>Odds reflect real-time market pressure, driven by liability balancing</li>
											<li>Settlement is automated, verifiable, and on-chain</li>
											<li>No counterparty risk — all minting and payouts are governed by protocol logic</li>
										</ul>
										<p className='mt-3'>
											An external sportsbook could:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Mirror their users' risk profile by placing bets into this system</li>
											<li>Offset exposure without capital lockups</li>
											<li>Protect themselves during periods of imbalance, large events, or promotional campaigns</li>
										</ul>
									</div>

									<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
										<h3 className='font-semibold text-foreground mb-2'>Stronger Industry, Not Just a Stronger Protocol</h3>
										<p className='text-sm'>
											By offering a neutral, scalable, and transparent risk sink, this protocol doesn't compete with other sportsbooks — it strengthens the entire industry.
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4 text-sm'>
											<li>New operators can launch with less capital</li>
											<li>Existing books can absorb more volume with less risk</li>
											<li>Market efficiency improves as edge-taking is replaced by real-time hedging</li>
										</ul>
										<p className='text-sm mt-3'>
											As liquidity increases and adoption grows, the protocol can become a core infrastructure layer for managing risk across the gambling sector — not just a new way to bet, but a new way to stay solvent.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 11. Deep Liquidity */}
					<section id='liquidity' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Deep Liquidity as Economic Infrastructure</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										As the ecosystem matures, liquidity on decentralized exchanges will naturally deepen — driven by protocol incentives, treasury support, and increased user participation. While this begins as a user experience improvement, it ultimately evolves into a core strength of the system's financial architecture.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Price Stability Through Depth</h3>
										<p>
											In the early stages of a token economy, price can be volatile due to thin liquidity and small order books. This creates friction for users:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Difficulty entering/exiting positions</li>
											<li>High slippage on conversions</li>
											<li>Value erosion when withdrawing winnings or reallocating capital</li>
										</ul>
										<p className='mt-3'>
											But as trading depth increases:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>The token price becomes more stable and less reactive to single trades</li>
											<li>Users can transact in size without affecting price</li>
											<li>The platform becomes economically insulated from broader market volatility, especially if the token is primarily driven by platform usage rather than speculation</li>
										</ul>
										<p className='mt-3'>
											This transforms the token from a volatile utility asset into a functional, resilient medium of exchange within the ecosystem.
										</p>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Liquidity as Access Layer</h3>
										<p>
											Deep liquidity also unlocks utility for every participant in the ecosystem:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Bettors can convert into and out of the token easily, with minimal friction</li>
											<li>Stakers benefit from a more stable value base and reduced risk of volatility-based drawdowns</li>
											<li>Liquidity providers earn consistent rewards in a predictable market</li>
											<li>External sportsbooks can hedge into the protocol with confidence that entry/exit won't distort their own risk model</li>
										</ul>
										<p className='mt-3'>
											Over time, this creates an economic flywheel:
										</p>
										<div className='p-4 rounded-lg bg-card border border-border space-y-2'>
											<div className='flex items-start gap-3'>
												<span className='font-semibold text-secondary'>1.</span>
												<p className='text-sm'>More users = more bets</p>
											</div>
											<div className='flex items-start gap-3'>
												<span className='font-semibold text-secondary'>2.</span>
												<p className='text-sm'>More margin = more emissions</p>
											</div>
											<div className='flex items-start gap-3'>
												<span className='font-semibold text-secondary'>3.</span>
												<p className='text-sm'>More rewards = more LPs</p>
											</div>
											<div className='flex items-start gap-3'>
												<span className='font-semibold text-secondary'>4.</span>
												<p className='text-sm'>More liquidity = better pricing and stability</p>
											</div>
											<div className='flex items-start gap-3'>
												<span className='font-semibold text-secondary'>5.</span>
												<p className='text-sm'>Better stability = more trust, higher volume, and potential institutional usage</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>Decentralized, Yet Predictable</h3>
										<p>
											Deep liquidity allows the token to function as a stable, purpose-driven economic unit, even in a volatile market. This doesn't mean the price is pegged or artificially constrained — it means:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Its value is anchored by usage</li>
											<li>Volatility is reduced by liquidity depth</li>
											<li>The user experience improves as the system scales</li>
										</ul>
										<p className='mt-3'>
											This is how the protocol can grow into a real alternative to traditional betting rails — one with trustless execution, transparent economics, and institutional-grade infrastructure.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 12. Optional Enhancements */}
					<section id='enhancements' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Optional Enhancements and Roadmap Extensions</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										The core platform design is intentionally simple and robust — prioritizing transparency, fairness, and scalability from day one. However, the architecture also supports a wide range of future enhancements that can deepen user engagement, improve transparency, and unlock new value streams.
									</p>
									<p>
										These extensions are not required for the system to function, but they offer exciting pathways for growth as the ecosystem matures.
									</p>

									<div className='space-y-4'>
										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>1. On-Chain Bet Recording via NFTs</h3>
											<p className='text-sm'>
												Each bet could optionally be minted as a non-fungible token (NFT) that serves as a receipt of the bet, a proof-of-prediction artifact, or a potential collectible or reputational badge. Winning NFTs could be redeemable for payouts, while losing NFTs could remain as part of a transparent, verifiable betting history. This could unlock bet history leaderboards, seasonal competitions (e.g. "Top 100 bettors"), and tradable markets for rare or historic bets.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>2. Leaderboards and Gamified Mechanics</h3>
											<p className='text-sm'>
												Using wallet-linked data, the system can introduce burn-based rewards ("Top 10 token burners"), volume-based competitions ("Most betting volume in a month"), community challenges and prediction leagues, and streak rewards for win consistency or bold bets. These programs can be built directly on top of existing bet logs and token flow — no need for separate infrastructure.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>3. Progressive Staking or Lock-Up Multipliers</h3>
											<p className='text-sm'>
												Staking could evolve to include tiered reward structures based on time commitments, loyalty multipliers for consistent stakers, and reputation layers tied to betting behavior or ecosystem contributions. This would deepen alignment with the protocol and give users additional ways to benefit beyond just LP provision or casual holding.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>4. Multi-Protocol Integration for Hedging and Access</h3>
											<p className='text-sm'>
												As adoption increases, the platform could offer SDKs or APIs for third-party sportsbooks to connect and hedge into the protocol, integration with existing prediction markets, and cross-chain exposure through bridges or wrapped versions of the token. This would extend the system's role as a neutral betting settlement layer for the industry at large.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>5. Governance Evolution</h3>
											<p className='text-sm'>
												Over time, governance could expand to include allocation adjustments, treasury disbursements and ecosystem grants, risk parameters and reward tuning, and long-term protocol development decisions. This creates a path toward user-directed evolution, ensuring the system remains responsive without becoming unstable.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>6. Visual and Social Layers</h3>
											<p className='text-sm'>
												To complement the technical infrastructure, the platform could also develop public dashboards for on-chain bet history and protocol stats, shareable win/loss records or NFT-based trophies, and interfaces for public predictions, social wagering, or community-curated markets. These layers would enhance visibility, onboarding, and brand identity — helping the protocol evolve into a destination, not just a backend.
											</p>
										</div>

										<div className='p-4 rounded-lg bg-card border border-border'>
											<h3 className='font-semibold text-foreground mb-2'>7. Programmatic On-Chain Referrals</h3>
											<p className='text-sm'>
												A native on-chain referral system can be introduced to scale user acquisition in a transparent, automated way. Unlike traditional referral programs that rely on trust and manual oversight, on-chain referrals are immutable and fraud-resistant, self-verifying with referral codes or wallet relationships tied directly to contract interactions, and scalable with no overhead per new user or region.
											</p>
											<p className='text-sm mt-2'>
												This unlocks powerful growth mechanics: users receive a share of margin rewards generated by referees, multi-level referral structures (with caps) can be encoded if desired, leaderboards and time-based campaigns can be layered on top (e.g. "Top referrers this quarter"), and treasury funds can be allocated dynamically to high-performing referral cohorts via governance.
											</p>
											<p className='text-sm mt-2'>
												By embedding referral logic directly into the protocol, the system can grow virally, without sacrificing sustainability or transparency.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					{/* 13. Closing Summary */}
					<section id='closing' className='scroll-mt-8'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-2xl font-heading mb-4'>Closing Summary: A Better Betting Economy, By Design</h2>
								<div className='space-y-6 text-muted-foreground'>
									<p>
										This protocol isn't just a sportsbook — it's a full economic system, designed from first principles to align incentives, eliminate risk, and scale transparently.
									</p>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>It Reimagines What a Betting Platform Can Be</h3>
										<p>
											No balance sheet exposure. No hidden odds manipulation. No extractive token inflation.
										</p>
										<p className='mt-2'>
											Instead, it offers:
										</p>
										<ul className='list-disc list-inside space-y-1 mt-2 ml-4'>
											<li>Burn-on-bet, mint-on-win mechanics that align reward with actual platform margin</li>
											<li>A deflationary token model that rewards usage, not speculation</li>
											<li>Deep liquidity incentives and programmatic staking that reinforce long-term alignment</li>
											<li>A structure that allows other sportsbooks to hedge, creating a decentralized backbone for risk distribution across the industry</li>
										</ul>
									</div>

									<div>
										<h3 className='font-semibold text-foreground mb-3'>From Early Phase to Full Ecosystem</h3>
										<p>
											From its early phase as a loyalty program to full token-based betting, staking, and treasury distribution — the platform prioritizes utility and sustainability over hype. It grows not through promises, but through usage.
										</p>
										<p className='mt-2'>
											With a robust core and a roadmap of modular enhancements — from NFT bet receipts and leaderboards to automated referrals and DAO-driven treasury control — this system is built to evolve.
										</p>
									</div>

									<div className='p-4 rounded-lg bg-secondary/10 border border-secondary/20'>
										<h3 className='font-semibold text-foreground mb-2'>The Promise</h3>
										<ul className='list-disc list-inside space-y-1 text-sm'>
											<li>It offers users a fairer experience</li>
											<li>It offers token holders real value capture</li>
											<li>And it offers the industry a safer, smarter way to manage risk at scale</li>
										</ul>
										<p className='text-sm mt-3 font-medium text-foreground'>
											This is not just a better sportsbook — it's a new foundation for betting.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			</div>
		</main>
	)
}




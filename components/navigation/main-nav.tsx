'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/leaderboard', label: 'Leaderboard' },
	{ href: '/about', label: 'About' },
]

export function MainNav() {
	const pathname = usePathname()
	const { user, profile } = useAuth()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<nav className='w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
			<div className='mx-auto max-w-7xl px-6'>
				<div className='flex h-20 items-center justify-between'>
					{/* Logo/Brand */}
					<Link
						href='/'
						className='flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-lg px-3 py-2 transition-all hover:scale-105'
						aria-label='Shibabet home'
					>
						<span className='text-xl font-heading tracking-tight text-secondary font-bold'>Shibabet</span>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-2'>
						{navItems.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										'relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background',
										isActive
											? 'text-foreground font-semibold bg-secondary/10'
											: 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
									)}
									aria-current={isActive ? 'page' : undefined}
								>
									<span className='relative z-10'>{item.label}</span>
									{isActive && (
										<span className='absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 rounded-lg' />
									)}
								</Link>
							)
						})}

						{/* Divider */}
						<div className='h-6 w-px bg-border/50 mx-2' />

						{/* Auth Links */}
						{user && profile ? (
							<Link
								href='/dashboard'
								className={cn(
									'relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background',
									pathname === '/dashboard'
										? 'text-foreground font-semibold bg-secondary/10'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
								)}
								aria-current={pathname === '/dashboard' ? 'page' : undefined}
							>
								<span className='relative z-10'>Dashboard</span>
								{pathname === '/dashboard' && (
									<span className='absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 rounded-lg' />
								)}
							</Link>
						) : (
							<Link
								href='/signin'
								className={cn(
									'px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background',
									pathname === '/signin'
										? 'bg-secondary text-background hover:bg-secondary/90'
										: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30'
								)}
								aria-current={pathname === '/signin' ? 'page' : undefined}
							>
								Sign In
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant='ghost'
						size='sm'
						className='md:hidden text-foreground hover:text-secondary hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-lg'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label='Toggle menu'
						aria-expanded={mobileMenuOpen}
					>
						<svg
							className='h-6 w-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							aria-hidden='true'
						>
							{mobileMenuOpen ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							)}
						</svg>
					</Button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className='md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md py-4 space-y-1 px-2'>
						{navItems.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className={cn(
										'block px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
										isActive
											? 'text-foreground font-semibold bg-secondary/10'
											: 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
									)}
									aria-current={isActive ? 'page' : undefined}
								>
									{item.label}
								</Link>
							)
						})}
						<div className='h-px bg-border/50 my-2' />
						{user && profile ? (
							<Link
								href='/dashboard'
								onClick={() => setMobileMenuOpen(false)}
								className={cn(
									'block px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
									pathname === '/dashboard'
										? 'text-foreground font-semibold bg-secondary/10'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
								)}
								aria-current={pathname === '/dashboard' ? 'page' : undefined}
							>
								Dashboard
							</Link>
						) : (
							<Link
								href='/signin'
								onClick={() => setMobileMenuOpen(false)}
								className={cn(
									'block px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
									pathname === '/signin'
										? 'bg-secondary text-background hover:bg-secondary/90'
										: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30'
								)}
								aria-current={pathname === '/signin' ? 'page' : undefined}
							>
								Sign In
							</Link>
						)}
					</div>
				)}
			</div>
		</nav>
	)
}


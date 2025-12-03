import type { Metadata } from 'next'
import { Orbitron, Montserrat } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'
import { ToastProvider } from '@/components/providers/toast-provider'
import { MainNav } from '@/components/navigation/main-nav'
import './globals.css'

const headingFont = Orbitron({
	subsets: ['latin'],
	variable: '--font-heading',
	display: 'swap',
})

const bodyFont = Montserrat({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Shibabet – Viral Waitlist',
	description: 'Shibabet viral waitlist MVP',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={`${bodyFont.variable} ${headingFont.variable} antialiased font-sans`}
			>
				<div className='min-h-screen flex flex-col bg-background text-foreground'>
					<AuthProvider>
						<MainNav />
						<main className='flex-1 mx-auto w-full max-w-5xl px-4 py-8'>
							{children}
							<ToastProvider />
						</main>
					</AuthProvider>

					<footer className='w-full border-t border-border mt-auto'>
						<div className='mx-auto max-w-5xl px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2'>
							<span>© {new Date().getFullYear()} Shibabet</span>
							<span>Viral waitlist MVP</span>
						</div>
					</footer>
				</div>
			</body>
		</html>
	)
}

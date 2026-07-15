import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/shared/styles/globals.css'
import { MainProvider } from '@/shared/providers'
import { ToggleTheme } from '@/shared/components'

const geistSans = Geist({
	variable: '--font-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Full Stack Авторизация',
		template: '%s | Full Stack Авторизация'
	},
	description:
		'Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			className={`${geistSans.variable} ${geistMono.variable}`}
			suppressHydrationWarning
		>
			<body className='antialiased'>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col'>
						<ToggleTheme />
						<div className='bg-background text-foreground relative flex min-h-screen flex-col items-center justify-center px-4 py-10'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}

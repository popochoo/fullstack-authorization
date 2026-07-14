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
						<div className='flex h-screen w-full items-center justify-center px-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}

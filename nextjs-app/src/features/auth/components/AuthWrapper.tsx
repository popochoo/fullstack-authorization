import Link from 'next/link'
import { PropsWithChildren } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui'

import { AuthSocial } from './AuthSocial'

interface AuthWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

export function AuthWrapper({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref,
	isShowSocial = false
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<Card className='border-border bg-card mx-auto w-full max-w-[420px] rounded-xl border shadow-sm'>
			<CardHeader className='space-y-2 p-5 pb-3 sm:p-6 sm:pb-4'>
				<CardTitle className='text-2xl font-semibold tracking-tight'>
					{heading}
				</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>

			<CardContent className='p-5 pt-0 sm:p-6 sm:pt-0'>
				{isShowSocial && (
					<>
						<AuthSocial />
						<div className='my-4' />
					</>
				)}
				{children}
			</CardContent>
			<CardFooter className='bg-muted/40 flex justify-center rounded-b-xl border-t px-5 py-4 sm:px-6'>
				{backButtonLabel && backButtonHref && (
					<Button variant={'link'} className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

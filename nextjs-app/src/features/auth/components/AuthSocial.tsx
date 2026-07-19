'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared/components/ui'

import { authService } from '../services'

export function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvier(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div className='grid grid-cols-2 gap-6'>
				<Button variant={'outline'} onClick={() => onClick('google')}>
					<FaGoogle className='mr-2 size-4' />
					Google
				</Button>
				<Button variant={'outline'} onClick={() => onClick('google')}>
					<FaYandex className='mr-2 size-4' />
					Яндекс
				</Button>
			</div>
			<div className='relative my-4 flex w-full items-center justify-center'>
				<div className='absolute inset-0 flex items-center'>
					<span className='border-border w-full border-t' />
				</div>
				<span className='bg-card text-muted-foreground relative px-3 text-xs uppercase'>
					или
				</span>
			</div>
		</>
	)
}

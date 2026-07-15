import { Button } from '@/shared/components/ui'

import { FaGoogle, FaYandex } from 'react-icons/fa'

export function AuthSocial() {
	return (
		<>
			<div className='grid grid-cols-2 gap-6'>
				<Button variant={'outline'}>
					<FaGoogle className='mr-2 size-4' />
					Google
				</Button>
				<Button variant={'outline'}>
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

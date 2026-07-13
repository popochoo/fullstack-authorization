'use client'

import { useTheme } from 'next-themes'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './ui'
import { Moon, Sun } from 'lucide-react'

export function ToggleTheme() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className='absolute top-5 left-5'
				render={
					<Button variant={'outline'} size={'icon'}>
						<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90' />
						<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
						<span className='sr-only'>Переключить тему</span>
					</Button>
				}
			/>
			<DropdownMenuContent className={'w-40'} align='start'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Светлая
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Темная
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

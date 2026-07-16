'use client'

import { LoginSchema, TypeLoginSchema } from '../schemes'
import { AuthWrapper } from './AuthWrapper'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	Input
} from '@/shared/components/ui'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { toast } from 'sonner'
import ReCAPTCHA from 'react-google-recaptcha'
import { useLoginMutation } from '../hooks'

export function LoginForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { loginMutate, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			loginMutate({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Войти'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full text-left'
			>
				<FieldGroup>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor='register-email'>
									Почта
								</FieldLabel>
								<Input
									id='register-email'
									type='email'
									placeholder='email@example.com'
									{...register('email')}
									disabled={isLoadingLogin}
								/>
								{errors.email && (
									<FieldError>
										{errors.email.message}
									</FieldError>
								)}
							</Field>
							<Field>
								<FieldLabel htmlFor='register-password'>
									Пароль
								</FieldLabel>
								<Input
									id='register-password'
									type='password'
									placeholder='••••••••'
									{...register('password')}
									disabled={isLoadingLogin}
								/>
								{errors.password && (
									<FieldError>
										{errors.password.message}
									</FieldError>
								)}
							</Field>
						</FieldGroup>
					</FieldSet>
					<div className='my-2 flex w-full justify-center'>
						{/* Контейнер-маска, обрезающий белые пиксели фрейма */}
						<div className='relative h-[76px] w-[302px] overflow-hidden rounded-[4px] border border-transparent shadow-[0_0_2px_1px_rgba(0,0,0,0.15)] dark:shadow-[0_0_2px_1px_rgba(0,0,0,0.5)]'>
							<div className='absolute -top-[1px] -left-[1px] h-[78px] w-[304px]'>
								<ReCAPTCHA
									sitekey={
										process.env
											.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
									}
									onChange={setRecaptchaValue}
									theme={theme === 'dark' ? 'dark' : 'light'}
								/>
							</div>
						</div>
					</div>
					<Field orientation={'horizontal'} className='mt-4'>
						<Button
							type='submit'
							className='w-full cursor-pointer'
							disabled={isLoadingLogin}
						>
							Войти в аккаунт
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

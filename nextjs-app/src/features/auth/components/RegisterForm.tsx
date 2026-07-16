'use client'

import { RegisterSchema, TypeRegisterSchema } from '../schemes'
import { AuthWrapper } from './AuthWrapper'

import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
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
import { useRegisterMutation } from '../hooks'

export function RegisterForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { registerMutate, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		if (recaptchaValue) {
			registerMutate({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='jus w-full space-y-3.5 text-left'
			>
				<FieldGroup>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor='register-name'>
									Имя
								</FieldLabel>
								<Input
									id='register-name'
									placeholder='Иван'
									{...register('name')}
									disabled={isLoadingRegister}
								/>
								{errors.name && (
									<FieldError>
										{errors.name.message}
									</FieldError>
								)}
							</Field>
							<Field>
								<FieldLabel htmlFor='register-email'>
									Почта
								</FieldLabel>
								<Input
									id='register-email'
									type='email'
									placeholder='email@example.com'
									{...register('email')}
									disabled={isLoadingRegister}
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
									disabled={isLoadingRegister}
								/>
								{errors.password && (
									<FieldError>
										{errors.password.message}
									</FieldError>
								)}
							</Field>
							<Field>
								<FieldLabel htmlFor='register-passwordRepeat'>
									Подтверждение пароля
								</FieldLabel>
								<Input
									id='register-passwordRepeat'
									type='password'
									placeholder='••••••••'
									{...register('passwordRepeat')}
									disabled={isLoadingRegister}
								/>
								{errors.passwordRepeat && (
									<FieldError>
										{errors.passwordRepeat.message}
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
							disabled={isLoadingRegister}
						>
							Создать аккаунт
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

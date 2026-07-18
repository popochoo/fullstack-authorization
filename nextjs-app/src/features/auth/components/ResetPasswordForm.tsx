'use client'

import { ResetPassordSchema, TypeResetPassordSchema } from '../schemes'
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
import { useResetPasswordMutation } from '../hooks'

export function ResetPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeResetPassordSchema>({
		resolver: zodResolver(ResetPassordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { resetMutate, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPassordSchema) => {
		if (recaptchaValue) {
			resetMutate({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Сброс пароля'
			description='Для сброса пароля введите свою почту'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
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
									disabled={isLoadingReset}
								/>
								{errors.email && (
									<FieldError>
										{errors.email.message}
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
							disabled={isLoadingReset}
						>
							Сбросить
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

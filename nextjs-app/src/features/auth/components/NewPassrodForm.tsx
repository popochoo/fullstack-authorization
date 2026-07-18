'use client'

import { NewPasswordSchema, TypeNewPasswordSchema } from '../schemes'
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
import { useNewPasswordMutation } from '../hooks'

export function NewPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	})

	const { newMutate, isLoadingNew } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			newMutate({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Новый парль'
			description='Придумайте новый пароль для вашего аккаунта'
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
								<FieldLabel htmlFor='register-password'>
									Новый пароль
								</FieldLabel>
								<Input
									id='register-password'
									type='password'
									placeholder='••••••••'
									{...register('password')}
									disabled={isLoadingNew}
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
							disabled={isLoadingNew}
						>
							Продолжить
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

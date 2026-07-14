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

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: TypeLoginSchema) => {
		console.log(values)
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
								<FieldLabel htmlFor='register-name'>
									Имя
								</FieldLabel>
								<Input
									id='register-name'
									placeholder='Иван'
									{...register('name')}
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
								/>
								{errors.password && (
									<FieldError>
										{errors.password.message}
									</FieldError>
								)}
							</Field>
						</FieldGroup>
					</FieldSet>
					<Field orientation={'horizontal'} className='mt-4'>
						<Button type='submit' className='w-full cursor-pointer'>
							Войти в аккаунт
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

'use client'

import { RegisterSchema, TypeRegisterSchema } from '../schemes'
import { AuthWrapper } from './AuthWrapper'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	Input
} from '@/shared/components/ui'

export function RegisterForm() {
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

	const onSubmit = (values: TypeRegisterSchema) => {
		console.log(values)
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
							<Field>
								<FieldLabel htmlFor='register-passwordRepeat'>
									Подтверждение пароля
								</FieldLabel>
								<Input
									id='register-passwordRepeat'
									type='password'
									placeholder='••••••••'
									{...register('passwordRepeat')}
								/>
								{errors.passwordRepeat && (
									<FieldError>
										{errors.passwordRepeat.message}
									</FieldError>
								)}
							</Field>
						</FieldGroup>
					</FieldSet>
					<Field orientation={'horizontal'} className='mt-4'>
						<Button type='submit' className='w-full cursor-pointer'>
							Создать аккаунт
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}

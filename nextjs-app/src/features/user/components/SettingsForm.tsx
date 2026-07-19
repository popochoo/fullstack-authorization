'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	FieldTitle,
	Input,
	Loading,
	Switch
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import { SettingsSchema, TypeSettingsSchema } from '../schemes'

import { UserButton } from './UserButton'
import { useUpdateProfileMutation } from '../hooks'
import { IUser } from '@/features/auth/types'

export function SettingsForm() {
	const { user, isLoading } = useProfile()

	console.log('ДАННЫЕ ЮЗЕРА ИЗ useProfile:', user)

	if (isLoading || !user) {
		return <Loading />
	}

	return <SettingsFormInner user={user} isLoading={isLoading} />
}

function SettingsFormInner({
	user,
	isLoading
}: {
	user: IUser
	isLoading: boolean
}) {
	const { updateMutate, isLoadingUpdate } = useUpdateProfileMutation()

	const {
		register,
		handleSubmit,
		formState: { errors },
		control
	} = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.displayName || '',
			email: user?.email || '',
			isTwoFactorEnabled: !!user?.isTwoFactorEnabled
		}
	})

	const onSubmit = (values: TypeSettingsSchema) => {
		updateMutate(values)
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Настройки профиля</CardTitle>
				<UserButton user={user} />
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='grid gap-2 space-y-2'
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
											disabled={isLoadingUpdate}
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
											disabled={isLoadingUpdate}
										/>
										{errors.email && (
											<FieldError>
												{errors.email.message}
											</FieldError>
										)}
									</Field>
									<Controller
										control={control}
										name='isTwoFactorEnabled'
										render={({ field }) => (
											<FieldLabel htmlFor='switch-share'>
												<Field orientation='horizontal'>
													<FieldContent>
														<FieldTitle>
															Двухфакторная
															аутентификация
														</FieldTitle>
														<FieldDescription>
															Включите
															двухфакторную
															аутентификацию для
															вашей учетной записи
														</FieldDescription>
													</FieldContent>
													<Switch
														id='switch-share'
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
														disabled={
															isLoadingUpdate
														}
													/>
												</Field>
											</FieldLabel>
										)}
									></Controller>
								</FieldGroup>
							</FieldSet>
							<Field>
								<Button
									type='submit'
									disabled={isLoadingUpdate}
								>
									Сохранить
								</Button>
							</Field>
						</FieldGroup>
					</form>
				)}
			</CardContent>
		</Card>
	)
}

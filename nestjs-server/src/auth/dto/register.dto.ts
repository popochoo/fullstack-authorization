import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate
} from 'class-validator'

import { IsPasswordsMathingConstraint } from '@/lib/common/decorators/isPasswordsMathingConstraint.decorator'

export class RegisterDto {
	@IsString({ message: 'Имя должно быть строкой' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
	name!: string

	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Email обязателен для заполнения.' })
	email!: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязателен для заполнения.' })
	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 символов.'
	})
	password!: string

	@IsString({ message: 'Пароль подтверждения должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль подтверждения обязателен для заполнения.' })
	@MinLength(6, {
		message: 'Пароль подтверждения должен содержать минимум 6 символов.'
	})
	@Validate(IsPasswordsMathingConstraint, {
		message: 'Пароли не совпадают.'
	})
	passwordRepeat!: string
}

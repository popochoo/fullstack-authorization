import { api } from '@/shared/api'

import { TypeNewPasswordSchema, TypeResetPassordSchema } from '../schemes'
import { IUser } from '../types'

class PasswordRecoveryService {
	public async reset(body: TypeResetPassordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			'auth/password-recovery/reset-password',
			body,
			{
				headers
			}
		)

		return response
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			`auth/password-recovery/new-password/${token}`,
			body,
			{
				headers
			}
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()

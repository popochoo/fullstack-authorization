import { z } from 'zod'

export const SettingsSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	name: z.string().min(1, {
		message: 'Введите имя'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>

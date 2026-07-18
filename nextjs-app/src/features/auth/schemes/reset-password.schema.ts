import { z } from 'zod'

export const ResetPassordSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	})
})

export type TypeResetPassordSchema = z.infer<typeof ResetPassordSchema>

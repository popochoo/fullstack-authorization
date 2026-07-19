import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../schemes'
import { authService } from '../services'

export function useRegisterMutation() {
	const { mutate: registerMutate, isPending: isLoadingRegister } =
		useMutation({
			mutationKey: ['register user'],
			mutationFn: ({
				values,
				recaptcha
			}: {
				values: TypeRegisterSchema
				recaptcha: string
			}) => authService.register(values, recaptcha),
			onSuccess() {
				toast.success('Успешная регистрация', {
					description:
						'Подтвердите почту. Сообщение отправлено на ваш почтовый адрес.'
				})
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { registerMutate, isLoadingRegister }
}

import { useMutation } from '@tanstack/react-query'
import { authService } from '../services'
import { TypeRegisterSchema } from '../schemes'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'

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

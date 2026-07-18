import { useMutation } from '@tanstack/react-query'
import { TypeResetPassordSchema } from '../schemes'
import { passwordRecoveryService } from '../services'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'

export function useResetPasswordMutation() {
	const { mutate: resetMutate, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPassordSchema
			recaptcha: string
		}) => passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для потдверждения'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { resetMutate, isLoadingReset }
}

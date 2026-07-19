import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeResetPassordSchema } from '../schemes'
import { passwordRecoveryService } from '../services'

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

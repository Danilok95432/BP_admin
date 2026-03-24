import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type ConcursInputs = {
	short: string
	mainphoto?: ImageItemWithText[]
}

export const concursSchema = yup.object().shape({
	short: yup
		.string()
		.required('Это поле обязательно')
		.test('is-empty', 'Введите текст', (value) => {
			const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
			return !!cleanValue && cleanValue !== ''
		}),
})

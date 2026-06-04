import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type LaureatInfoInputs = {
	laureat_name: string
	laureat_year: SelOption[] | string
	laureat_desc?: string
	laureat_info?: string
	laureat_full?: string
	laureat_vid?: SelOption[] | string
	mainphoto?: ImageItemWithText[]
	photos?: ImageItemWithText[]
}

export const laureatInfoSchema = yup.object().shape({
	laureat_name: yup.string().required('Введите лауреата'),
	laureat_year: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите год получения премии', (value) => {
			if (typeof value === 'string') {
				return true
			} else if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]
				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Год не выбран'
				) {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		})
		.required('Выберите год получения премии'),
})

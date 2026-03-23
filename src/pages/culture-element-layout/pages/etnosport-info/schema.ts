import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type LaureatInfoInputs = {
	laureat_name: string
	laureat_year?: SelOption[] | string
	laureat_desc?: string
	laureat_info?: string
	laureat_full?: string
	mainphoto?: ImageItemWithText[]
	photos?: ImageItemWithText[]
}

export const laureatInfoSchema = yup.object().shape({
	laureat_name: yup.string().required('Введите лауреата'),
})

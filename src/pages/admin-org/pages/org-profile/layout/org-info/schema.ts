import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type OrgProfileInputs = {
	title: string
	text1?: string
	text2?: string
	text3?: string
	short?: string
	full?: string
	mainphoto?: ImageItemWithText[]
	photoGallery?: ImageItemWithText[]
}

export const orgProfileSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
})

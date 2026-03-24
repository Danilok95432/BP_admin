import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type CommunityInputs = {
	full: string
	full2?: string
	short?: string
	title?: string
	mainphoto?: ImageItemWithText[]
	photoGallery?: ImageItemWithText[]
}

export const communitySchema = yup.object().shape({
	full: yup.string().required('Введите текст'),
})

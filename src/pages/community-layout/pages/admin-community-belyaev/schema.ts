import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type CommunityBelyaevInputs = {
	full: string
	full2?: string
	short?: string
	title?: string
	mainphoto?: ImageItemWithText[]
	photoGallery?: ImageItemWithText[]
}

export const communityBelyaevSchema = yup.object().shape({
	full: yup.string().required('Введите текст'),
})

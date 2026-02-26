import * as yup from 'yup'

export type ImagesInputs = {
	id?: string
	thumbnail?: string
	original?: string
	title: string
	author?: string
}

export const imageSchema = yup.object({
	title: yup.string().required('Заголовок обязателен'),
})

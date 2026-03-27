import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OrgDetailsInputs = {
	bank?: string
	bik?: string
	fioDir?: string
	fullName: string
	inn?: string
	korChet?: string
	kpp?: string
	ogrn?: string
	phone?: string
	positionDir?: SelOption[] | string
	rasChet?: string
	title?: string
}

export const orgDetailsSchema = yup.object().shape({
	fullName: yup.string().required('Введите название'),
})

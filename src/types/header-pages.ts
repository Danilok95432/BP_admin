import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

export type HeaderPageResponse = {
	page: HeaderPages
	status: string
}

export type HeaderPages = {
	title: string
	short: string
	full: string
	full2: string
	documents: string
	text1: string
	text2: string
	text3: string
	photoGallery: ImageItemWithText[]
	mainphoto: ImageItemWithText[]
}

export type ContactsInfo = {
	bank: string
	bik: string
	fioDir: string
	fullName: string
	inn: string
	korChet: string
	kpp: string
	ogrn: string
	phone: string
	positionDir: SelOption[]
	rasChet: string
	title: string
}

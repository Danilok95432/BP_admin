import { type ImageItemWithText } from './photos'

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

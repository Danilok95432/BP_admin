import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

export type LaureatListResponse = {
	laureats: LaureatItem[]
}

export type AboutLaureatHeader = {
	anonstext: string
	logo: ImageItemWithText[]
	photos: ImageItemWithText[]
}

export type LaureatItem = {
	id: string
	laureat_name: string
	laureat_year: string
	laureat_info: string
	laureat_desc: string
	photo: ImageItemWithText[]
	hidden: boolean
}

export type LaureatNewItemResponse = {
	status: string
	id: string
}

export type LaureatItemInfoResponse = {
	laureat_name: string
	laureat_info: string
	laureat_desc: string
	laureat_full: string
	laureat_year: SelOption[]
	hidden: boolean
	photos: ImageItemWithText[]
	mainphoto: ImageItemWithText[]
}

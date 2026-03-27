import { type FileWithPreview } from 'src/types/files'

export type PromoBlock = {
	id: string
	title: string
	isHidden: boolean
	contentType: string
	contentChoice: string
	createdAt: Date
	promoDesktopImage: FileWithPreview[]
	promoMobileImage: FileWithPreview[]
}

export type SiteSettingsResponse = {
	isShowPromo: boolean
	isShowBtnRequest: boolean
	isShowBtnBel: boolean
	isShowBtnRasp: boolean
	isShowNews: boolean
	isShowHistory: boolean
	isShowInfo: boolean
	isShowVideos: boolean
	isShowEvents: boolean
	isShowPartners: boolean
	isShowFaq: boolean
	phone: string
	email: string
	vk: string
	title: string
}

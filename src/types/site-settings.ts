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

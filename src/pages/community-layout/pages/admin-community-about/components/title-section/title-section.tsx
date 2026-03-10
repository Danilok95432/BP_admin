import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

type TitleSectionProps = {
	logo?: ImageItemWithText[]
}

export const TitleSection: FC<TitleSectionProps> = ({ logo }) => {
	return (
		<AdminSection>
			<ReactDropzone
				label='Фотография'
				name='logo'
				prompt='PNG, JPG, JPEG. 500х500, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px 0'
				previewVariant='sm-img'
				imgtype='about_general'
				fileImages={logo}
			/>

			<QuillEditor name='mainDescs' label='Текст-анонс*' $heightEditor='200px' />
		</AdminSection>
	)
}

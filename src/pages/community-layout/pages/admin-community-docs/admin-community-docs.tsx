import { type FC } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { type FileItem } from 'src/types/files'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { RemoveFileSvg } from 'src/UI/icons/removeFileSVG'

import styles from './index.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	type EventContentInputs,
	eventContentSchema,
} from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-content/schema'
import { useGetHeaderEditQuery } from 'src/store/pages/pages.api'

type DocsSectionProps = {
	files?: FileItem[]
}

export const AboutDocs: FC<DocsSectionProps> = ({ files = [] }) => {
	const { data: headerData } = useGetHeaderEditQuery('premia')
	const methods = useForm<EventContentInputs>({
		mode: 'onBlur',
		resolver: yupResolver(eventContentSchema),
		defaultValues: {
			hide_placements: false,
			hide_gallery: false,
			hide_links: false,
			hide_documents: false,
		},
	})
	const onSubmit: SubmitHandler<EventContentInputs> = async (data) => {
		console.log(data)
	}
	return (
		<AdminContent className={styles.eventContentPage}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<AdminSection
						titleText='Документы премии'
						sectionName='documents'
						additionalNodeForHead={
							<SwitchedRadioBtns
								name='hide_documents'
								contentRadio1='Показать всем'
								contentRadio2='Скрыть'
							/>
						}
					>
						<ReactDropzoneFiles
							previewVariant='list'
							removeIcon={<RemoveFileSvg />}
							name='documents'
							accept={{
								'application/pdf': ['.pdf'],
								'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
									'.docx',
								],
							}}
							maxFiles={7}
							files={headerData?.page.documents}
							fileType='pages_premia'
							multiple
							customUploadBtn={<AddButton>Добавить документ</AddButton>}
						/>
					</AdminSection>
				</form>
			</FormProvider>
		</AdminContent>
	)
}

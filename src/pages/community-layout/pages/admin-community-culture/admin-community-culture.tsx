/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState, type FC } from 'react'
import {
	type EtnoInputs,
	etnoSchema,
} from 'src/pages/community-layout/pages/admin-community-culture/schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { transformToFormData } from 'src/helpers/utils'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import { FlexRow } from 'src/components/flex-row/flex-row'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { CultureElements } from 'src/pages/community-layout/pages/admin-community-culture/components/culture-elements/culture-elements'

import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useGetLaureatsListQuery } from 'src/store/laureats/laureats'
import { useGetHeaderEditQuery, useSaveHeaderMutation } from 'src/store/pages/pages.api'

export const AdminCommunityCulture: FC = () => {
	const { data: headerData } = useGetHeaderEditQuery('laureats')
	const { data: laureatsList } = useGetLaureatsListQuery(null)
	const [, setLocaleImages] = useState<ImageItemWithText[]>(headerData?.page.photoGallery ?? [])
	const [saveHeader] = useSaveHeaderMutation()

	useEffect(() => {
		setLocaleImages(headerData?.page.photoGallery ?? [])
	}, [headerData?.page.photoGallery])

	const methods = useForm<EtnoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(etnoSchema),
		defaultValues: {
			mainphoto: [],
			photoGallery: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<EtnoInputs> = async (data) => {
		const newData = {
			...data,
			page_type: 'laureats',
		}
		try {
			const res = await saveHeader(transformToFormData(newData))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (headerData?.page) {
			methods.reset({ ...headerData.page })
		}
	}, [headerData?.page])

	return (
		<>
			<Helmet>
				<title>Лауреаты</title>
			</Helmet>

			<AdminContent title='Лауреаты' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<QuillEditor $heightEditor='310px' name='full' label='Текст-анонс' />
						<ReactDropzone
							label='Основное изображение *'
							name='mainphoto'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='20px 0 20px 0'
							previewVariant='sm-img'
							imgtype='pages_laureats'
							fileImages={headerData?.page.mainphoto}
							className={styles.dzArea}
						/>
						<FlexRow $margin='25px 0 50px 0' $gap='15px'>
							<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
								Сохранить
							</AdminButton>
							<AdminButton as='link' to='/' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<CultureElements laureats={laureatsList?.laureats} />
			</AdminContent>
		</>
	)
}

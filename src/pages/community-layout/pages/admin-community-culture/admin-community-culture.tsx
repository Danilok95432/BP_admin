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
import { useGetEtnoEditQuery, useSaveEtnosportMutation } from 'src/store/vids/vids.api'
import { useGetLaureatsListQuery } from 'src/store/laureats/laureats'

export const AdminCommunityCulture: FC = () => {
	const { data: etnoData } = useGetEtnoEditQuery(null)
	const { data: laureatsList } = useGetLaureatsListQuery(null)
	const [, setLocaleImages] = useState<ImageItemWithText[]>(etnoData?.photos ?? [])
	const [saveEtnosport] = useSaveEtnosportMutation()

	useEffect(() => {
		setLocaleImages(etnoData?.photos ?? [])
	}, [etnoData?.photos])

	const methods = useForm<EtnoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(etnoSchema),
		defaultValues: {
			photos: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<EtnoInputs> = async (data) => {
		try {
			const res = await saveEtnosport(transformToFormData(data))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (etnoData) {
			methods.reset({ ...etnoData })
		}
	}, [etnoData])

	return (
		<>
			<Helmet>
				<title>Лауреаты</title>
			</Helmet>

			<AdminContent title='Лауреаты' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<QuillEditor $heightEditor='310px' name='anonstext' label='Текст-анонс' />
						<ReactDropzone
							label='Основное изображение *'
							name='mainphoto'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='20px 0 20px 0'
							previewVariant='sm-img'
							imgtype='laureat'
							fileImages={etnoData?.photos}
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

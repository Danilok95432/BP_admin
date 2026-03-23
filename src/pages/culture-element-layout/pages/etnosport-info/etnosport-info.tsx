import {
	type LaureatInfoInputs,
	laureatInfoSchema,
} from 'src/pages/culture-element-layout/pages/etnosport-info/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { transformToFormData } from 'src/helpers/utils'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { type ImageItemWithText } from 'src/types/photos'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { useGetLaureatInfoQuery, useSaveLaureatInfoMutation } from 'src/store/laureats/laureats'

export const EtnosportInfo = () => {
	const { id = '0' } = useParams()
	const { data: laureatInfo } = useGetLaureatInfoQuery(id)
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(
		laureatInfo?.mainphoto ?? [],
	)
	const [saveCultureInfo] = useSaveLaureatInfoMutation()

	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'laureat_gallery',
		idItem: id,
	})
	const addImage = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const syncAddImagesHandler = useCallback((newImage: ImageItemWithText) => {
		setLocaleImages((prevImages) => [...prevImages, newImage])
	}, [])

	const syncEditImagesHandler = useCallback((editImage: ImageItemWithText) => {
		setLocaleImages((prevImages) => {
			return prevImages.map((image) => {
				if (image.id === editImage.id) {
					return { ...image, ...editImage }
				}
				return image
			})
		})
	}, [])

	const { openModal } = useActions()

	const handleOpenModal = async () => {
		const newId = await addImage()
		openModal(
			<ImageModal
				id={newId}
				imgtype='laureat_gallery'
				syncAddHandler={syncAddImagesHandler}
				syncEditHandler={syncEditImagesHandler}
			/>,
		)
	}

	useEffect(() => {
		setLocaleImages(laureatInfo?.mainphoto ?? [])
	}, [laureatInfo?.mainphoto])

	const methods = useForm<LaureatInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(laureatInfoSchema),
		defaultValues: {
			mainphoto: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<LaureatInfoInputs> = async (data) => {
		const newData = {
			...data,
			id,
		}
		try {
			const res = await saveCultureInfo(transformToFormData(newData))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (laureatInfo) {
			methods.reset({ ...laureatInfo })
		}
	}, [laureatInfo])

	return (
		<>
			<Helmet>
				<title>Лауреат</title>
			</Helmet>
			<AdminContent className={styles.cultureInfoPage}>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminLaureats}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку лауреатов
				</Link>
				<h3>Лауреат</h3>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<ControlledInput
							name='laureat_name'
							label='Лауреат *'
							maxWidth='1140px'
							margin='0 0 20px 0'
						/>
						<ControlledSelect
							name='laureat_year'
							label='Год получения премии *'
							selectOptions={laureatInfo?.laureat_year ?? [{ label: 'Не выбрано', value: '0' }]}
							margin='0 0 20px 0'
							className={styles.selectVid}
						/>
						<ControlledSelect
							name='vid'
							label='Вид участия *'
							margin='0 0 20px 0'
							selectOptions={[{ label: 'Не выбрано', value: '0' }]}
							className={styles.selectVid}
						/>
						<ReactDropzone
							label='Фото лауреата *'
							name='mainphoto'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='0 0 20px 0'
							previewVariant='sm-img'
							imgtype='laureat'
							fileImages={laureatInfo?.mainphoto}
							className={styles.dzArea}
						/>
						<QuillEditor
							name='laureat_info'
							label='Краткая информация'
							$maxWidth='1140px'
							$heightEditor='105px'
							className={styles.textArea}
						/>
						<QuillEditor
							name='laureat_full'
							label='Полная информация'
							$maxWidth='1140px'
							$heightEditor='105px'
							className={styles.textArea}
						/>
						<QuillEditor
							name='laureat_desc'
							label='Текст-анонс'
							$maxWidth='1140px'
							$heightEditor='105px'
							className={styles.textArea}
						/>
						<ReactDropzone
							margin='30px 0 20px 0'
							label='Галерея изображений'
							previewVariant='img-list'
							variant='culture'
							name='photos'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							maxFiles={8}
							fileImages={localeImages}
							syncAdd={syncAddImagesHandler}
							syncEdit={syncEditImagesHandler}
							imgtype='laureat_gallery'
							dzAreaClassName={styles.cultureGalleryController}
							className={styles.dzArea}
							multiple
							customOpenModal={
								<AddButton
									onClick={handleOpenModal}
									icon={<AddImageCulturePlusSVG />}
									$padding='44px 60px'
								>
									{' '}
								</AddButton>
							}
							customUploadBtn={
								<AddButton
									onClick={handleOpenModal}
									icon={<AddImageCulturePlusSVG />}
									$padding='44px 60px'
								>
									{' '}
								</AddButton>
							}
						/>
						<FlexRow $margin='40px 0 45px 0' $gap='15px'>
							<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
								Сохранить
							</AdminButton>
							<AdminButton as='link' to='/' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminLaureats}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку лауреатов
				</Link>
			</AdminContent>
		</>
	)
}

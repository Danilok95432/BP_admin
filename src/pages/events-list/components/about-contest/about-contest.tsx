/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState, type FC } from 'react'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { useGetHeaderEditQuery, useSaveHeaderMutation } from 'src/store/pages/pages.api'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { type ConcursInputs, concursSchema } from './schema'

export const AdminAboutContest: FC = () => {
	const { data: headerData } = useGetHeaderEditQuery('concurs')
	const [saveHeader] = useSaveHeaderMutation()
	const methods = useForm<ConcursInputs>({
		mode: 'onBlur',
		resolver: yupResolver(concursSchema),
	})

	const [, setAction] = useState<'apply' | 'save'>('apply')
	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<ConcursInputs> = async (data) => {
		const newData = {
			...data,
			page_type: 'concurs',
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
			methods.reset({ ...headerData?.page })
		}
	}, [headerData?.page])

	return (
		<AdminContent className={styles.eventProfilePage} $backgroundColor='#ffffff'>
			<h3 className={styles.title}>Конкурс</h3>
			<FormProvider {...methods}>
				<form
					className={styles.eventProfileForm}
					onSubmit={methods.handleSubmit(onSubmit)}
					noValidate
					autoComplete='off'
				>
					<ControlledInput
						name='short'
						label='О конкурсе *'
						margin=' 0 0 20px 0'
						isTextarea
						height='200px'
					/>
					<ReactDropzone
						label='Основное изображение'
						name='mainphoto'
						prompt='PNG, JPG, JPEG. Изображение должно быть круглым или квадратным, не более 3 Мб'
						accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
						margin='20px 0 20px 0'
						previewVariant='sm-img'
						imgtype='pages_concurs'
						fileImages={headerData?.page.mainphoto}
						className={styles.dzArea}
					/>
					<FlexRow $margin='0 0 40px 0' $maxWidth='1140px' $justifyContent='space-between'>
						<FlexRow>
							<AdminButton
								as='button'
								type='submit'
								onClick={() => setAction('save')}
								$variant={isSent ? 'sent' : 'primary'}
							>
								Сохранить
							</AdminButton>
						</FlexRow>
					</FlexRow>
				</form>
			</FormProvider>
		</AdminContent>
	)
}

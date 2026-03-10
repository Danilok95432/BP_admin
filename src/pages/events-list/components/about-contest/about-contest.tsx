import { useState, type FC } from 'react'
import {
	type EventProfileInputs,
	eventProfileSchema,
} from 'src/pages/one-event-layout/pages/admin-event-profile/schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'

export const AdminAboutContest: FC = () => {
	const methods = useForm<EventProfileInputs>({
		mode: 'onBlur',
		resolver: yupResolver(eventProfileSchema),
		defaultValues: {
			main: false,
			hidden: false,
		},
	})

	const [, setAction] = useState<'apply' | 'save'>('apply')

	const onSubmit: SubmitHandler<EventProfileInputs> = async (data) => {
		console.log(data)
	}

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
						name='contest-info'
						label='О конкурсе *'
						margin=' 0 0 20px 0'
						isTextarea
						height='200px'
						bigFont
					/>
					<ReactDropzone
						label='Основное изображение'
						name='contest-logo'
						prompt='PNG, JPG, JPEG. Изображение должно быть круглым или квадратным, не более 3 Мб'
						accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
						margin='20px 0 20px 0'
						previewVariant='sm-img'
						imgtype='contest-logo'
						fileImages={[]}
					/>
					<FlexRow $margin='0 0 40px 0' $maxWidth='1140px' $justifyContent='space-between'>
						<FlexRow>
							<AdminButton as='button' type='submit' onClick={() => setAction('save')}>
								Сохранить
							</AdminButton>
						</FlexRow>
					</FlexRow>
				</form>
			</FormProvider>
		</AdminContent>
	)
}

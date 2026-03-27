import { useEffect, useState, type FC } from 'react'
import { defaultMainBlocksValues, type SettingsInputs } from 'src/pages/admin-settings/schema'

import { Helmet } from 'react-helmet-async'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainBlocksSection } from 'src/pages/admin-settings/components/main-blocks-section/main-blocks-section'
// import { PromoTable } from 'src/pages/admin-settings/components/promo-table/promo-table'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { ContactsSection } from './components/contacts-section/contacts-section'
import { SettingsSection } from './components/settings-section/settings-section'
import {
	useGetSettingsQuery,
	useSaveSettingsMutation,
} from 'src/store/site-settings/site-settings.api'
import { booleanToNumberString } from 'src/helpers/utils'

export const AdminSettings: FC = () => {
	const { data: settingsData } = useGetSettingsQuery(null)
	const [saveSettings] = useSaveSettingsMutation()
	const methods = useForm<SettingsInputs>({
		mode: 'onBlur',
		defaultValues: defaultMainBlocksValues,
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const onSubmit: SubmitHandler<SettingsInputs> = async (data) => {
		const formData = new FormData()
		formData.append('isShowPromo', booleanToNumberString(data.isShowPromo))
		formData.append('isShowBtnRequest', booleanToNumberString(data.isShowBtnRequest))
		formData.append('isShowBtnBel', booleanToNumberString(data.isShowBtnBel))
		formData.append('isShowBtnRasp', booleanToNumberString(data.isShowBtnRasp))
		formData.append('isShowNews', booleanToNumberString(data.isShowNews))
		formData.append('isShowHistory', booleanToNumberString(data.isShowHistory))
		formData.append('isShowInfo', booleanToNumberString(data.isShowInfo))
		formData.append('isShowVideos', booleanToNumberString(data.isShowVideos))
		formData.append('isShowEvents', booleanToNumberString(data.isShowEvents))
		formData.append('isShowPartners', booleanToNumberString(data.isShowPartners))
		formData.append('isShowFaq', booleanToNumberString(data.isShowFaq))
		formData.append('phone', data?.phone ?? '')
		formData.append('email', data?.email ?? '')
		formData.append('vk', data?.vk ?? '')
		formData.append('title', data?.title ?? '')
		try {
			const res = await saveSettings(formData)
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (settingsData) {
			methods.reset({ ...settingsData })
		}
	}, [settingsData])

	return (
		<>
			<Helmet>
				<title>Общие настройки</title>
			</Helmet>
			<h1>Общие настройки</h1>
			<AdminContent
				className={styles.settingsContent}
				$backgroundColor='#ffffff'
				$padding='25px 30px 60px 40px'
			>
				{/* <PromoTable /> */}
				<FormProvider {...methods}>
					<form
						className={styles.mainBlocksForm}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
					>
						<MainBlocksSection />
						<ContactsSection />
						<SettingsSection />
						<AdminControllers
							outLink={AdminRoute.AdminHome}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}

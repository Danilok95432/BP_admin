import { useState, type FC } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { CustomDisclaimer } from 'src/components/custom-disclaimer/custom-disclaimer'

export const AdminSettings: FC = () => {
	const methods = useForm<SettingsInputs>({
		mode: 'onBlur',
		defaultValues: defaultMainBlocksValues,
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<SettingsInputs> = (data) => {
		console.log(data)
		markAsSent(true)
		if (action === 'save') {
			navigate(`/${AdminRoute.AdminHome}`)
		}
	}
	return (
		<>
			<Helmet>
				<title>Настройки сайта</title>
			</Helmet>
			<h1>Настройки сайта</h1>
			<AdminContent
				className={styles.settingsContent}
				$backgroundColor='#ffffff'
				link='#'
				$padding='25px 30px 60px 40px'
			>
				{/* <PromoTable /> */}
				<CustomDisclaimer className={styles.disc}>
					<p>
						Внимание! В этом разделе настраивается посадочная страница актуального события. Ваш
						тарифный план предусматривает только один лэндинг одного события в момент времени. Для
						того, чтобы получить возможность публиковать информацию сразу о нескольких событиях,
						свяжитесь с нашим комерчепским отделом.
					</p>
				</CustomDisclaimer>
				<FormProvider {...methods}>
					<form
						className={styles.mainBlocksForm}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
					>
						<MainBlocksSection />
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

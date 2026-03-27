import { type OrgDetailsInputs, orgDetailsSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useEffect, useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { OrgMainInfoSection } from './components/org-main-info/org-main-info'
import { OrgAdditionalInfoSection } from './components/org-additional-info/org-additional-info'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styles from './index.module.scss'
import { useGetFondDetailsQuery, useSaveFondDetailsMutation } from 'src/store/pages/pages.api'

export const OrgDetails = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')
	const { data: reqData } = useGetFondDetailsQuery('')
	const [saveDetails] = useSaveFondDetailsMutation()
	const passStatus = true

	const methods = useForm<OrgDetailsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orgDetailsSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OrgDetailsInputs> = async (data) => {
		const formData = new FormData()
		formData.append('bank', data?.bank ?? '')
		formData.append('bik', data?.bik ?? '')
		formData.append('fioDir', data?.fioDir ?? '')
		formData.append('fullName', data?.fullName ?? '')
		formData.append('inn', data?.inn ?? '')
		formData.append('korChet', data?.korChet ?? '')
		formData.append('kpp', data?.kpp ?? '')
		formData.append('ogrn', data?.ogrn ?? '')
		formData.append('phone', data?.phone ?? '')
		formData.append('rasChet', data?.rasChet ?? '')
		formData.append('title', data?.title ?? '')
		formData.append(
			'positionDir',
			typeof data.positionDir === 'string'
				? data.positionDir
				: data.positionDir
					? data.positionDir[0].value
					: '0',
		)
		try {
			const res = await saveDetails(formData)
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (reqData) {
			methods.reset({ ...reqData })
		}
	}, [reqData])

	return (
		<div className={styles.onePartnerPage}>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						{passStatus ? (
							<>
								<OrgMainInfoSection />
								<OrgAdditionalInfoSection dirOptions={reqData?.positionDir} />
								<AdminControllers variant='5' isSent={isSent} actionHandler={setAction} />
							</>
						) : (
							<FlexRow className={styles.passRow}>
								<p>
									Для того, чтобы сменить любые реквизиты активированного организатора, обратитесь к
									администратору.
								</p>
								<AdminButton>Отправить обращение</AdminButton>
							</FlexRow>
						)}
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}

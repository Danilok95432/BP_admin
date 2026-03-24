/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type OrgProfileInputs, orgProfileSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useEffect, useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { MainSection } from './component/main-section'
import { transformToFormData } from 'src/helpers/utils'
import { useGetHeaderEditQuery, useSaveHeaderMutation } from 'src/store/pages/pages.api'

export const OrgProfileInfo = () => {
	const { data: headerData } = useGetHeaderEditQuery('fond')
	const [saveHeader] = useSaveHeaderMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OrgProfileInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orgProfileSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<OrgProfileInputs> = async (data) => {
		const newData = {
			...data,
			page_type: 'fond',
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
		<div>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection
							photo={headerData?.page.mainphoto}
							photos={headerData?.page.photoGallery}
						/>
						<AdminControllers variant='5' isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}

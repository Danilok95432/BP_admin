/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type FC, useEffect, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import {
	type CommunityInputs,
	communitySchema,
} from 'src/pages/community-layout/pages/admin-community-about/schema'

import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { TitleSection } from 'src/pages/community-layout/pages/admin-community-about/components/title-section/title-section'
import { GallerySection } from 'src/pages/community-layout/pages/admin-community-about/components/gallery-section/gallery-section'
import { ArticleSection } from 'src/pages/community-layout/pages/admin-community-about/components/article-section/article-section'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useGetHeaderEditQuery, useSaveHeaderMutation } from 'src/store/pages/pages.api'

export const AdminCommunityAbout: FC = () => {
	const { data: headerData } = useGetHeaderEditQuery('premia')
	const [saveHeader] = useSaveHeaderMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<CommunityInputs>({
		mode: 'onBlur',
		resolver: yupResolver(communitySchema),
		defaultValues: {
			mainphoto: [],
			photoGallery: [],
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<CommunityInputs> = async (data) => {
		try {
			const serverData = {
				...data,
				page_type: 'premia',
			}
			const res = await saveHeader(transformToFormData(serverData))
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
		<>
			<Helmet>
				<title>О премии</title>
			</Helmet>
			<AdminContent title='Детали и история' link='https://pab.npotau.ru/about'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<TitleSection logo={headerData?.page?.mainphoto} />
						<GallerySection images={headerData?.page?.photoGallery} />
						<ArticleSection />
						<AdminControllers isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}

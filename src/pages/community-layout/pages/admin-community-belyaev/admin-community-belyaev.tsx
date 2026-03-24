/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type FC, useEffect, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { ArticleSection } from './components/article-section/article-section'
import { GallerySection } from './components/gallery-section/gallery-section'
import { TitleSection } from './components/title-section/title-section'
import { useGetHeaderEditQuery, useSaveHeaderMutation } from 'src/store/pages/pages.api'
import { type CommunityBelyaevInputs, communityBelyaevSchema } from './schema'

export const AdminCommunityBelyaev: FC = () => {
	const { data: headerData } = useGetHeaderEditQuery('belyaev')
	const [saveHeader] = useSaveHeaderMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<CommunityBelyaevInputs>({
		mode: 'onBlur',
		resolver: yupResolver(communityBelyaevSchema),
		defaultValues: {
			mainphoto: [],
			photoGallery: [],
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<CommunityBelyaevInputs> = async (data) => {
		try {
			const serverData = {
				...data,
				page_type: 'belyaev',
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
				<title>Александр Беляев</title>
			</Helmet>
			<AdminContent title='Александр Беляев' link='https://pab.npotau.ru/belyaev'>
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

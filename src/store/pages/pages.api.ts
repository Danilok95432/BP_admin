import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import { type ContactsInfo, type HeaderPageResponse } from 'src/types/header-pages'

export const pagesApi = createApi({
	reducerPath: ReducerPath.Pages,
	tagTypes: ['Header', 'HeaderInfo', 'Fond'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getHeaderEdit: build.query<HeaderPageResponse, string>({
			query: (pageType) => ({
				url: `/pages/edit`,
				params: {
					page_type: pageType,
				},
			}),
			providesTags: ['Header'],
		}),
		saveHeader: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/pages/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Header'],
		}),
		getFondDetails: build.query<ContactsInfo, string>({
			query: (pageType) => ({
				url: `/contacts/edit`,
				params: {
					page_type: pageType,
				},
			}),
			providesTags: ['Fond'],
		}),
		saveFondDetails: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/contacts/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Fond'],
		}),
	}),
})

export const {
	useGetHeaderEditQuery,
	useSaveHeaderMutation,
	useGetFondDetailsQuery,
	useSaveFondDetailsMutation,
} = pagesApi

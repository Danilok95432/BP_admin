import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import { type HeaderPageResponse } from 'src/types/header-pages'

export const pagesApi = createApi({
	reducerPath: ReducerPath.Pages,
	tagTypes: ['Header', 'HeaderInfo'],
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
	}),
})

export const { useGetHeaderEditQuery, useSaveHeaderMutation } = pagesApi

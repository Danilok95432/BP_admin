import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import {
	type AboutLaureatHeader,
	type LaureatItemInfoResponse,
	type LaureatListResponse,
	type LaureatNewItemResponse,
} from 'src/types/laureats'

export const laureatsApi = createApi({
	reducerPath: ReducerPath.Laureats,
	tagTypes: ['Laureats', 'LaureatsInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getLaureatsList: build.query<LaureatListResponse, null>({
			query: () => ({
				url: `/laureats/list`,
			}),
			providesTags: ['Laureats'],
		}),
		getLaureatHeaderEdit: build.query<AboutLaureatHeader, null>({
			query: () => ({
				url: `/about_etno/edit`,
			}),
			providesTags: ['Laureats'],
		}),
		saveLaureatHeader: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/about_etno/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Laureats'],
		}),
		deleteLaureatById: build.mutation<null, string>({
			query: (laureatId) => ({
				url: `laureats/delete`,
				method: 'DELETE',
				body: { id: laureatId },
			}),
			invalidatesTags: ['Laureats'],
		}),
		hideLaureatById: build.mutation<null, string>({
			query: (laureatId) => ({
				url: `laureats/hide`,
				method: 'POST',
				body: { id: laureatId },
			}),
			invalidatesTags: ['Laureats'],
		}),
		getLaureatInfo: build.query<LaureatItemInfoResponse, string>({
			query: (id) => ({
				url: `laureats/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Laureats'],
		}),
		getNewIdLaureat: build.query<LaureatNewItemResponse, null>({
			query: () => ({
				url: `laureats/getnew`,
			}),
			providesTags: ['LaureatsInfo', 'Laureats'],
		}),
		saveLaureatInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `laureats/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['LaureatsInfo', 'Laureats'],
		}),
	}),
})

export const {
	useDeleteLaureatByIdMutation,
	useGetLaureatHeaderEditQuery,
	useGetLaureatInfoQuery,
	useGetLaureatsListQuery,
	useGetNewIdLaureatQuery,
	useHideLaureatByIdMutation,
	useSaveLaureatHeaderMutation,
	useSaveLaureatInfoMutation,
} = laureatsApi

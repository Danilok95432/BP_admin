import { type SiteSettingsResponse, type PromoBlock } from 'src/types/site-settings'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { type FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const siteSettingsApi = createApi({
	reducerPath: ReducerPath.SiteSettings,
	tagTypes: ['SiteSettings'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getPromos: build.query<PromoBlock[], null>({
			query: () => ({
				url: `promo-blocks`,
			}),
		}),
		getSettings: build.query<SiteSettingsResponse, null>({
			query: () => ({
				url: `settings/edit`,
			}),
		}),
		saveSettings: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/settings/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['SiteSettings'],
		}),
	}),
})

export const { useGetPromosQuery, useGetSettingsQuery, useSaveSettingsMutation } = siteSettingsApi

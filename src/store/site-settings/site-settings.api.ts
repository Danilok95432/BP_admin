import { type PromoBlock } from 'src/types/site-settings'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL, ReducerPath } from 'src/helpers/consts'

export const siteSettingsApi = createApi({
	reducerPath: ReducerPath.SiteSettings,
	tagTypes: ['SiteSettings'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		getPromos: build.query<PromoBlock[], null>({
			query: () => ({
				url: `promo-blocks`,
			}),
		}),
	}),
})

export const { useGetPromosQuery } = siteSettingsApi

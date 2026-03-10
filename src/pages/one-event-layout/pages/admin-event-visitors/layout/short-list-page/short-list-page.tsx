import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const ShortListPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Шорт-лист</title>
			</Helmet>
			<Outlet />
		</>
	)
}

import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const LongListPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Лонг-лист</title>
			</Helmet>
			<Outlet />
		</>
	)
}

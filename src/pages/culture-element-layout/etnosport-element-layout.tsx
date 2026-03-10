import { Outlet } from 'react-router-dom'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const EtnosportElementLayout = () => {
	// const etnoTabs: TabNavigationItem[] = [
	// 	{
	// 		title: 'Информация',
	// 		link: `/laureat/laureat-info/${id ?? 'new'}`,
	// 	},
	// 	{
	// 		title: 'Правила',
	// 		link: `/laureat/laureat-rules/${id ?? 'new'}`,
	// 	},
	// ]
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Лауреат</h1>
				{/* <TabNavigation navItems={etnoTabs} /> */}
			</div>
			<Outlet />
		</>
	)
}

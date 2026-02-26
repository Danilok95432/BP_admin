import { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { useGetEventInfoQuery } from 'src/store/events/events.api'
import type { TabNavigationItem } from 'src/types/navigation'

export const OneEventLayout = () => {
	const { id = '' } = useParams()
	const { data: eventInfoData } = useGetEventInfoQuery(id)
	const location = useLocation()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Профиль события',
			link: `/event/event-profile/${id ?? 'new'}`,
		},
		{
			title: 'Настройка',
			link: `/event/event-settings/${id ?? 'new'}`,
			indexLink: `/event/event-settings/${id}/registration`,
		},
		{
			title: 'Контент',
			link: `/event/event-content/${id ?? 'new'}`,
			indexLink: `/event/event-content/${id}/content`,
		},
		{
			title: 'Пропуск',
			link: `/event/event-pass/${id ?? 'new'}`,
			indexLink: `/event/event-pass/${id}`,
		},
		{
			title: 'Списки и статистика',
			link: `/event/event-lists/${id}`,
			indexLink: `/event/event-lists/${id}/registrations`,
		},
		{
			title: 'Размещение (публикация)',
			link: `/event/event-placement/${id}`,
			indexLink: `/event/event-placement/${id}`,
		},
	]
	const [isProgramPage, setIsProgramPage] = useState<boolean>(false)

	useEffect(() => {
		setIsProgramPage(location.pathname.includes('/one-program'))
	}, [location.pathname])
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				{!isProgramPage ? (
					<h1>{eventInfoData?.title !== '' ? eventInfoData?.title : 'Новое событие'}</h1>
				) : (
					<h1>Подсобытие</h1>
				)}
				{!isProgramPage && <TabNavigation navItems={eventTabs} />}
			</div>
			<Outlet />
		</>
	)
}

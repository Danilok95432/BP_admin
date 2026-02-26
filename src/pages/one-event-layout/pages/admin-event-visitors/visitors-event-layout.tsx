import { Outlet, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import type { TabNavigationItem } from 'src/types/navigation'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const VisitorsEventLayout = () => {
	const { id = '' } = useParams()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Регистрация',
			link: `/event/event-lists/${id}/registrations`,
		},
		{
			title: 'Купленные билеты',
			link: `/event/event-lists/${id}/tickets`,
		},
		{
			title: 'Журнал проходов',
			link: `/event/event-lists/${id}/log-enters`,
		},
		{
			title: 'Сводка продаж',
			link: `/event/event-lists/${id}/sales`,
		},
		{
			title: 'Наплывы',
			link: `/event/event-lists/${id}/naplivi`,
		},
		{
			title: 'Статистика SMS',
			link: `/event/event-lists/${id}/sms`,
		},
		{
			title: 'Агентский баланс',
			link: `/event/event-lists/${id}/balance`,
		},
	]

	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
				{!location.pathname.includes('/requests/') &&
					!location.pathname.includes('/participants/') &&
					!location.pathname.includes('/inspectors/') &&
					!location.pathname.includes('/guests/') &&
					!location.pathname.includes('/person-statistic/') && (
						<div className={styles.headRow}>
							<div className={styles.adminTitleTab}>
								<h2>Списки и статистика</h2>
								<TabNavigation variant='visitors' navItems={eventTabs} />
							</div>
						</div>
					)}
			</Container>
			<Outlet />
		</AdminContent>
	)
}

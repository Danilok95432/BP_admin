import { type TabNavigationItem } from 'src/types/navigation'

export const orgTabs: TabNavigationItem[] = [
	{
		title: 'Сводка',
		link: `/org/info`,
	},
	{
		title: 'Профиль',
		link: `/org/profile/info`,
		indexLink: `/org/profile/info`,
	},
	{
		title: 'Статистика',
		link: `/org/statistic`,
		indexLink: `/org/statistic`,
	},
	{
		title: 'Финансы',
		link: `/org/finances/stat`,
		indexLink: `/org/finances/stat`,
	},
]

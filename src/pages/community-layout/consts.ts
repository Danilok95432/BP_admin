import { type TabNavigationItem } from 'src/types/navigation'

export const communityTabs: TabNavigationItem[] = [
	{
		title: 'Об этноспорте',
		link: '/about',
		exact: true,
	},
	{
		title: 'Русский этноспорт',
		link: 'about-etnosport',
	},
	{
		title: 'Исконные забавы',
		link: 'about-fun',
	},
	/* {
		title: 'Документы',
		link: 'atm-documents',
	}, */
]

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import styles from './index.module.scss'

export const MainBlocksSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Блоки страницы (лендинга)</h2>
			<ControlledCheckbox
				name='isShowObjects'
				label='Показать блок «Промо-лента»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowEvents'
				label='Показать блок «Программа»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowMap'
				label='Показать блок «Карта»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowNews'
				label='Показать блок «Финансовые партнеры»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowVideos'
				label='Показать блок «Информационные партнеры»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowPartners'
				label='Показать блок «Партнеры-организаторы»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='isShowFaq'
				label='Показать блок «Часто задаваемые вопросы»'
				type='checkbox'
				$margin='0 0 20px 0'
			/>
			<ControlledCheckbox
				name='isShowForm'
				label='Показать блок «Форма регистрации в теле страницы»'
				type='checkbox'
				className={styles.boldCheck}
			/>
		</AdminSection>
	)
}

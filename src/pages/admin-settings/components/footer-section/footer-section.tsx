import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const FooterSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Информация в футере</h2>
			<ControlledInput
				name='copyright'
				label='Копирайт'
				placeholder='Международная премия имени Александра Беляева'
				margin='0 0 20px 0'
			/>
		</AdminSection>
	)
}

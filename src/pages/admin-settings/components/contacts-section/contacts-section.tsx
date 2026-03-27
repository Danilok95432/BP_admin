import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const ContactsSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Контакты на сайте</h2>
			<ControlledInput
				name='phone'
				label='Контактный телефон'
				placeholder='+7 (***) ***-**-**'
				margin='0 0 20px 0'
				isPhone
			/>
			<ControlledInput
				name='email'
				label='Контактный e-mai'
				placeholder='Контактный e-mai'
				margin='0 0 20px 0'
			/>
			<ControlledInput name='vk' label='Адрес ВК' placeholder='Адрес ВК' margin='0 0 20px 0' />
		</AdminSection>
	)
}

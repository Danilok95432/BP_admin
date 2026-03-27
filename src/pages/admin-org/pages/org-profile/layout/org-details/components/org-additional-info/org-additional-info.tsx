import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

type OrgProps = {
	dirOptions?: SelOption[]
}

export const OrgAdditionalInfoSection: FC<OrgProps> = ({ dirOptions }) => {
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='bank'
					label='Банк *'
					placeholder='Банк'
					margin='0 0 20px 0'
					height='80px'
					isTextarea
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<GridRow>
				<div className={styles.inputWrapper}>
					<ControlledInput name='bik' label='БИК *' margin='0 0 20px 0' />
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
			</GridRow>
			<div className={styles.inputWrapper}>
				<ControlledInput name='rasChet' label='Расчетный счет *' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='korChet' label='Корсчет счет *' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='positionDir'
					label='Должность руководителя *'
					selectOptions={dirOptions ?? [{ label: 'Генеральный директор', value: '0' }]}
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='fioDir'
					label='Фамилия, имя, отчество руководителя *'
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}

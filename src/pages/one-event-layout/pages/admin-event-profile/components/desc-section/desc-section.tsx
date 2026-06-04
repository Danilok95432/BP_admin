import { AdminSection } from 'src/components/admin-section/admin-section'

import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { GridRow } from 'src/components/grid-row/grid-row'

import { type FC } from 'react'
import { type SelOption } from 'src/types/select'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

type DescSectionProps = {
	ageList?: SelOption[]
	locationsList?: SelOption[]
	eventTypesList?: SelOption[]
}

export const DescSection: FC<DescSectionProps> = ({ ageList, locationsList, eventTypesList }) => {
	return (
		<AdminSection isBlock={false}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='count_requests'
					label='Количество поданных заявок на участие в номинации'
					placeholder='Количество поданных заявок на участие в номинации'
					margin='0 0 20px 0'
					className={styles.inputCountReq}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='description'
					label='Описание номинации *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textAria}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			{/*
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='fullinfo'
					label='Подробное описание *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textAria}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			*/}
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='conditions'
					label='Текст номинации *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textAria}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr' $margin='0 0 20px 0'>
				<div className={styles.inputWrapper}>
					<ControlledSelect
						label='Возрастной рейтинг *'
						name='age_list'
						selectOptions={ageList ?? [{ label: 'Не выбрано', value: '0' }]}
					/>

					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
						<InfoIconSvg />
					</Tooltip>
				</div>
			</GridRow>

			<div className={styles.inputWrapper}>
				<ControlledSelect
					label='Тип номинации *'
					name='event_types_list'
					margin='0 0 25px 0'
					selectOptions={eventTypesList ?? [{ label: 'Не выбрано', value: '0' }]}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			{/* <p className={styles.placeRequest}>
				Если площадки нет в списке, Вы можете{' '}
				<a href={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminLocationsList}/1`}>
					запросить добавление новой площадки
				</a>
			</p> */}
		</AdminSection>
	)
}

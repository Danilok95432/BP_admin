import React, { type FC, useMemo } from 'react'
import { type SelOption } from 'src/types/select'
import { type FieldError, useController, useFormContext } from 'react-hook-form'

import Select from 'react-dropdown-select'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'

import styles from './index.module.scss'

type ControlledSelectProps = {
	selectOptions?: SelOption[] // Делаем опциональным
	name: string
	label?: string
	className?: string
	margin?: string
	dynamicError?: FieldError | undefined
	disabled?: boolean
	isRequired?: boolean
	bigFont?: boolean
	yearsRange?: { start: number; end: number } // Добавляем yearsRange
}

export const ControlledSelect: FC<ControlledSelectProps> = ({
	selectOptions = [], // Значение по умолчанию
	name,
	label,
	className,
	margin,
	dynamicError,
	disabled,
	isRequired,
	bigFont = false,
	yearsRange,
	...props
}) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext()

	// Генерируем опции годов, если передан yearsRange
	const options = useMemo(() => {
		if (yearsRange) {
			const years: SelOption[] = []
			for (let year = yearsRange.end; year >= yearsRange.start; year--) {
				years.push({
					value: year.toString(),
					label: year.toString(),
				})
			}
			return years
		}
		return selectOptions
	}, [yearsRange, selectOptions])

	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
		defaultValue: options[0]?.value || '',
	})

	// Находим выбранную опцию для отображения
	const selectedValues = options.filter((opt) => opt.value === value)

	return (
		<div
			className={cn(styles.selectWrapper, { [styles.selectHugeWrapper]: bigFont }, className)}
			style={{ margin }}
		>
			{label && (
				<label>
					{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
				</label>
			)}
			<Select
				{...register(name)}
				{...props}
				options={options}
				values={selectedValues}
				onChange={(values) => onChange(values[0]?.value)}
				disabled={disabled}
				className={cn({ [styles.disabled]: disabled })}
			/>
			{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}

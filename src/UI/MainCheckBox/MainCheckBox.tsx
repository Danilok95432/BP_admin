import React, { useState, type FC, type ReactNode } from 'react'
import cn from 'classnames'

import { CheckMarkSvg } from '../icons/checkMarkSVG'

import styles from './index.module.scss'

type MainCheckBoxProps = {
	svgNode?: ReactNode
	checked: boolean
	disabled?: boolean
	label?: string
}
export const MainCheckBox: FC<MainCheckBoxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
	svgNode,
	checked,
	disabled,
	label,
	...props
}) => {
	const [active, setActive] = useState(checked)
	return (
		<div
			className={cn(styles.checkBoxWrapper, props.className, { [styles._disabled]: disabled })}
			onClick={(e) => {
				if (!disabled) {
					setActive(!active)
				}
				e.stopPropagation()
			}}
		>
			<label className={cn({ [styles._active]: active })}>{active && <CheckMarkSvg />}</label>
			<input type='checkbox' />
			{label && <p>{label}</p>}
		</div>
	)
}

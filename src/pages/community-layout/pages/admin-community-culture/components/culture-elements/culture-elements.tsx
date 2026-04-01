import { useNavigate } from 'react-router-dom'
import { type FC } from 'react'
import cn from 'classnames'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { CultureElementsFiltrationInputs } from './consts'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { type LaureatItem } from 'src/types/laureats'
import {
	useDeleteLaureatByIdMutation,
	useGetNewIdLaureatQuery,
	useHideLaureatByIdMutation,
} from 'src/store/laureats/laureats'

type CultureElementsProps = {
	laureats?: LaureatItem[]
}

export const CultureElements: FC<CultureElementsProps> = ({ laureats = [] }) => {
	const { refetch: getNewId } = useGetNewIdLaureatQuery(null)
	const [hideCulturesById] = useHideLaureatByIdMutation()
	const [deleteCulturesById] = useDeleteLaureatByIdMutation()

	const navigate = useNavigate()

	const addCulture = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Лауреаты', 'Вид участия', 'Год', '']
	const formatCulturesTableData = (laureatData: LaureatItem[]) => {
		return laureatData.map((laureatEl) => {
			return {
				rowId: laureatEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': laureatEl.hidden })} key='0'>
						{laureatEl.laureat_name}
					</p>,
					<p className={cn({ 'hidden-cell': laureatEl.hidden })} key='1'></p>,
					<p className={cn({ 'hidden-cell': laureatEl.hidden })} key='2'>
						{laureatEl.laureat_year}
					</p>,
					<RowController
						id={laureatEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть лауреата'
						key='3'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteCulturesById(id)
	}
	const rowHideHandler = async (id: string) => {
		await hideCulturesById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/laureat/laureat-info/${id}`)
	}

	const handleAddCultureClick = async () => {
		const newId = await addCulture()
		navigate(`/laureat/laureat-info/${newId}`)
	}

	if (!laureats) return <Loader />

	return (
		<div>
			<GridRow $margin='0 0 15px 0' className={styles.searchRow}>
				<TableFiltration filterInputs={CultureElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.cultureTable}
				rowData={formatCulturesTableData(laureats)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={laureats.length}
				addClickHandler={handleAddCultureClick}
				addText='Добавить элемент'
			/>
		</div>
	)
}

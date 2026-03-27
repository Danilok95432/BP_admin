import * as yup from 'yup'

export type RulesInputs = {
	rule_name: string
	rule_text: string
}

export const rulesSchema = yup.object({
	rule_name: yup.string().required('Введите название правил'),
	rule_text: yup.string().required('Введите описание правил'),
})

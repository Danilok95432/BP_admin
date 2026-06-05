import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'telphone',
		placeholder: 'искать по номеру телефона...',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии участника...',
		type: 'text',
	},
	{
		name: 'email',
		placeholder: 'искать по e-mail...',
		type: 'text',
	},
]

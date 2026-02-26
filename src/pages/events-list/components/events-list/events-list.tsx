import { Helmet } from 'react-helmet-async'
import { EventsTable } from 'src/pages/events-list/components/events-list/components/events-table/events-table'

export const EventsList = () => {
	return (
		<>
			<Helmet>
				<title>События</title>
			</Helmet>
			<h3>События</h3>
			<EventsTable />
		</>
	)
}

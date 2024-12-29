import Barchart from '../components/Barchart';
import Linechart from '../components/Linechart';
import Piechart from '../components/Piechart';
import { useReadingsStore } from '../stores/readings.store';
import Cards from '../styles/Cards';
import Form from '../styles/Form';
import '../main.css';

export default function OrderReadings() {
	useReadingsStore.getState().setDomain(0, null);

	return (
		<>
			<Form />
			<div className="flex items-start">
				<div className="w-[65%]">
					<Cards />
					<div className="ml-2">
						<Linechart />
					</div>
				</div>

				<div className="w-[50%]">
					<div className="ml-2">
						<Barchart />
					</div>
					<div className="ml-2">
						<Piechart />
					</div>
				</div>
			</div>
		</>
	);
}

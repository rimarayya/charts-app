import BarCh from '../components/BarCh';
import LineCh from '../components/LineCh';
import PieCh from '../components/PieCh';
import { useReadingsStore } from '../stores/readings.store';
import Cards from '../styles/Cards';
import '../main.css';

export default function OrderReadings() {
	useReadingsStore.getState().setDomain(0, null);

	return (
		<div className="flex items-start">
			<div className="w-[65%]">
				<Cards />
				<div className="ml-2">
					<LineCh />
				</div>
			</div>

			<div className="w-[50%]">
				<div className="ml-2">
					<BarCh />
				</div>
				<div className="ml-2">
					<PieCh />
				</div>
			</div>
		</div>
	);
}

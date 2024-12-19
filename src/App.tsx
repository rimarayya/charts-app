/* eslint-disable react-hooks/exhaustive-deps */
import Linechart from './components/Linechart';
import './main.css';
import Piechart from './components/Piechart';
import Form from './styles/Form';
import { useReadingsStore } from './stores/readings.store';
import { useEffect } from 'react';
import Cards from './styles/Cards';

const App = () => {
	const {
		setReferenceTimestamp,
		setDomain,
		referenceTimestamp,
		domainStart,
		domainEnd,
	} = useReadingsStore();

	useEffect(() => {
		if (referenceTimestamp === null) {
			setReferenceTimestamp(new Date());
		}
		if (domainStart === 0 && domainEnd === null) {
			setDomain(0, null);
		}
	}, []);
	return (
		<>
			<Form />
			<div>
				<Cards />
			</div>
			<div className="flex space-x-4 mb-8">
				<div className="w-[65%]">
					<Linechart />
				</div>

				<div className="w-[35%]">
					<Piechart />
				</div>
			</div>
		</>
	);
};

export default App;

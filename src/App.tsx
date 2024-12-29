import Linechart from './components/Linechart';
import './main.css';
import Piechart from './components/Piechart';
import Form from './styles/Form';
import { useReadingsStore } from './stores/readings.store';
import Cards from './styles/Cards';
import { ThemeProvider } from './components/ThemeProvider';

const App = () => {
	useReadingsStore.getState().setDomain(0, null);
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Form />
				<div className="flex items-start">
					<div className="w-[70%]">
						<Cards />
						<div className="ml-4">
							<Linechart />
						</div>
					</div>

					<div className="w-[45%]">
						<Piechart />
					</div>
				</div>
			</ThemeProvider>
		</>
	);
};

export default App;

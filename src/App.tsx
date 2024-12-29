import './main.css';
import { ThemeProvider } from './components/ThemeProvider';
import OrderReadings from './pages/OrderReadings';

export default function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<OrderReadings />
			</ThemeProvider>
		</>
	);
}

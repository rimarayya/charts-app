import './main.css';
import { ThemeProvider } from './components/ThemeProvider';
import OrderReadings from './pages/OrderReadings';
import Form from './styles/Form';
import AccordionSection from './components/AccordionSection';

export default function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Form />
				<AccordionSection
					accordionTriggerTitle="Order Readings"
					accordionContent={<OrderReadings />}
				/>
			</ThemeProvider>
		</>
	);
}

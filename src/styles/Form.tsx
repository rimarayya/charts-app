import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ModeToggle } from '../components/ModeToggle';
import { useReadingsStore } from '../stores/readings.store';
import { DateTimePicker } from '../components/time-picker/DateTimePicker';
import { useState } from 'react';

export default function Form() {
	const { domainStart, domainEnd, setDomain, setReferenceTimestamp } =
		useReadingsStore();

	const [rightDate, setRightDate] = useState<Date | null>(null);

	const onRightDateChange = (date: Date) => {
		setRightDate(date);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const startDomain = Number(formData.get('start-domain')) || null;
		const endDomain = Number(formData.get('end-domain')) || null;

		// Set the reference timestamp when the form is submitted
		if (rightDate) {
			setReferenceTimestamp(rightDate);
		}

		// Set the domain values
		setDomain(startDomain, endDomain);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 bg-form shadow m-4 rounded-lg"
		>
			<div className="flex space-y-4 lg:space-y-0 lg:space-x-4">
				<div className="flex items-center w-full lg:w-auto">
					<Label htmlFor="reference-date" className="w-28">
						Reference Date
					</Label>
					<DateTimePicker onRightDateChange={onRightDateChange} />
				</div>
				<div className="flex items-center w-full lg:w-auto">
					<Label htmlFor="start-domain" className="w-36">
						Start Domain
					</Label>
					<Input
						id="start-domain"
						name="start-domain"
						type="number"
						defaultValue={domainStart ?? ''}
						className="outline-none focus:ring-1 focus:border-foreground bg-background"
					/>
				</div>
				<div className="flex items-center w-full lg:w-auto">
					<Label htmlFor="end-domain" className="w-36">
						End Domain
					</Label>
					<Input
						id="end-domain"
						name="end-domain"
						type="number"
						defaultValue={domainEnd ?? ''}
						placeholder="Leave blank for no limit"
						className="outline-none focus:ring-1 focus:border-foreground bg-background"
					/>
				</div>
				<div className="flex justify-end w-full lg:w-auto">
					<button
						type="submit"
						className="px-4 bg-primary text-white rounded duration-300 ease-in-out hover:bg-secondary"
					>
						Submit
					</button>
				</div>
				<ModeToggle />
			</div>
		</form>
	);
}

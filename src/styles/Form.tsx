import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import { useReadingsStore } from '../stores/readings.store';

export default function Form() {
	const { domainStart, domainEnd, setDomain, referenceTimestamp } =
		useReadingsStore();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const startDomain = Number(formData.get('start-domain')) || null;
		const endDomain = Number(formData.get('end-domain')) || null;

		setDomain(startDomain, endDomain);
	};

	return (
		<form onSubmit={handleSubmit} className="p-4 bg-neutral-50 shadow mb-4">
			<div className="flex space-x-4 ">
				<div className="flex items-center">
					<Label htmlFor="reference-date" className="w-36">
						Reference Date
					</Label>
					<Input
						id="reference-date"
						type="datetime-local"
						defaultValue={
							referenceTimestamp?.toISOString().slice(0, -1) || ''
						}
					/>
				</div>
				<div className="flex items-center ">
					<Label htmlFor="start-domain" className="w-36">
						Start Domain
					</Label>
					<Input
						id="start-domain"
						name="start-domain"
						type="number"
						defaultValue={domainStart ?? ''}
					/>
				</div>
				<div className="flex items-center">
					<Label htmlFor="end-domain" className="w-36">
						End Domain
					</Label>
					<Input
						id="end-domain"
						name="end-domain"
						type="number"
						defaultValue={domainEnd ?? ''}
						placeholder="Leave blank for no limit"
					/>
				</div>
				<button
					type="submit"
					className="px-4  bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Submit
				</button>
			</div>
		</form>
	);
}

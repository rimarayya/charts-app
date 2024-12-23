import { Card, CardHeader } from '../components/ui/card';
import { useReadingsStore } from '../stores/readings.store';

export default function Cards() {
	const { notInOrderCount, inOrderCount, timestampReadings } =
		useReadingsStore();

	const totalReadingsInDomain = timestampReadings.length;
	return (
		<div className="flex gap-2 mb-4 ml-4 mr-4">
			<Card className="bg-blue-200 h-28 w-56 flex flex-col justify-between text-white">
				<CardHeader>
					<h3 className="text-xl font-semibold">Total</h3>
					<p className="text-2xl font-bold">
						{totalReadingsInDomain}
					</p>
				</CardHeader>
			</Card>

			<Card className="bg-indigo-300 h-28 w-56 flex flex-col justify-between text-white">
				<CardHeader>
					<h3 className="text-xl font-semibold">In-Order</h3>
					<p className="text-2xl font-bold">{inOrderCount}</p>
				</CardHeader>
			</Card>

			<Card className="bg-lime-300 h-28 w-56 flex flex-col justify-between text-white">
				<CardHeader>
					<h3 className="text-xl font-semibold">Not In-Order</h3>
					<p className="text-2xl font-bold">{notInOrderCount}</p>
				</CardHeader>
			</Card>
		</div>
	);
}

import { Card, CardHeader, CardContent } from '../components/ui/card';
import { useReadingsStore } from '../stores/readings.store';

export default function Cards() {
	const { notInOrderCount, inOrderCount, timestampReadings } =
		useReadingsStore();

	const totalReadingsInDomain = timestampReadings.length;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-8">
			<Card className="bg-blue-100 h-40 w-68 flex flex-col justify-between">
				<CardHeader>
					<h3 className="text-xl font-semibold">Total</h3>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">
						{totalReadingsInDomain}
					</p>
				</CardContent>
			</Card>

			<Card className="bg-red-100 h-40 w-68 flex flex-col justify-between">
				<CardHeader>
					<h3 className="text-xl font-semibold">Not In-Order</h3>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{notInOrderCount}</p>
				</CardContent>
			</Card>

			<Card className="bg-green-100 h-40 w-68 flex flex-col justify-between">
				<CardHeader>
					<h3 className="text-xl font-semibold">In-Order</h3>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{inOrderCount}</p>
				</CardContent>
			</Card>
		</div>
	);
}

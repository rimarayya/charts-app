import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useReadingsStore } from '../stores/readings.store';

export default function Piechart() {
	const { inOrderCount, notInOrderCount } = useReadingsStore();
	const total = inOrderCount + notInOrderCount;

	const data = [
		{ name: 'In Ordered', value: inOrderCount, color: '#00ff00' },
		{
			name: 'Not In Ordered',
			value: notInOrderCount,
			color: '#ff7300',
		},
	];

	return (
		<ResponsiveContainer width="100%" height={400}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					outerRadius={150}
					label={({ name, value }) => `${name}: ${value}`}
				>
					{data.map((obj, index) => (
						<Cell key={index} fill={obj.color} />
					))}
				</Pie>
				<Tooltip />
				<Legend
					formatter={(value) => {
						const matchedItem = data.find(
							(item) => item.name === value
						);
						const percentage = matchedItem
							? ((matchedItem.value / total) * 100).toFixed(2)
							: '0.00';

						return `${value} (${percentage}%)`;
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}

import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useReadingsStore } from '../stores/readings.store';

export default function PieCh() {
	const { inOrderCount, notInOrderCount } = useReadingsStore();
	const total = inOrderCount + notInOrderCount;

	const data = [
		{
			name: 'In Order',
			value: inOrderCount,
			color: 'hsl(var(--chart-2))',
		},
		{
			name: 'Not In Order',
			value: notInOrderCount,
			color: 'hsl(var(--chart-1))',
		},
	];

	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					outerRadius={105}
					label={({ name, value }) => `${name}: ${value}`}
					stroke="hsl(var(--background))"
					strokeWidth={2}
				>
					{data.map((obj, index) => (
						<Cell key={index} fill={obj.color} />
					))}
				</Pie>
				<Tooltip
					contentStyle={{
						backgroundColor: 'hsl(var(--form))',
						borderRadius: '8px',
						border: '1px solid hsl(var(--text))',
						fontSize: 18,
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
						padding: '10px',
					}}
					itemStyle={{
						color: 'hsl(var(--text))',
					}}
				/>
				<Legend
					formatter={(value) => {
						const matchedItem = data.find(
							(item) => item.name === value
						);
						const percentage = matchedItem
							? ((matchedItem.value / total) * 100).toFixed(2)
							: '0.00';

						return `${percentage}%`;
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}

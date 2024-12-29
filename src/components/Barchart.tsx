import {
	BarChart,
	Bar,
	Brush,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useReadingsStore } from '../stores/readings.store';
import { useState } from 'react';

export default function Barchart() {
	const { orderGroup } = useReadingsStore();

	// const data: { count: number; number: number }[] = [];

	// for (let i = 0; i < orderGroup.length; i++) {
	// 	data.push({ count: orderGroup[i], number: i + 1 });
	// }

	const data: {
		count: number;
		number: number;
		inOrder: number;
		notInOrder: number;
	}[] = orderGroup.map((count, index) => ({
		count: count,
		number: index + 1,
		inOrder: count >= 0 ? count : 0,
		notInOrder: count < 0 ? count : 0,
	}));

	const [lineProps, setLineProps] = useState({
		notInOrder: true,
		inOrder: true,
	});

	const selectLine = (data: { value: string }) => {
		const dataKey = data.value === 'In Order' ? 'inOrder' : 'notInOrder';
		if (dataKey === 'inOrder' || dataKey === 'notInOrder') {
			setLineProps({
				...lineProps,
				[dataKey]: !lineProps[dataKey],
			});
		}
	};

	return (
		<ResponsiveContainer width={550} height={350}>
			<BarChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 35,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="number"
					label={{
						value: 'Group Count',
						style: { textAnchor: 'middle' },
						position: 'insideBottom',
						offset: -80,
						fontSize: 16,
						fill: 'hsl(var(--text))',
					}}
					tick={{
						fill: 'hsl(var(--text))',
						fontSize: 14,
					}}
					tickMargin={5}
				/>
				<YAxis
					dataKey="count"
					label={{
						value: 'Readings Number',
						style: { textAnchor: 'middle' },
						fontSize: 16,
						fill: 'hsl(var(--text))',
						angle: -90,
						position: 'left',
						offset: -10,
					}}
					domain={['auto', 'auto']}
					padding={{ top: 20, bottom: 20 }}
					tick={{
						fill: 'hsl(var(--text))',
						fontSize: 12,
					}}
					tickMargin={5}
				/>
				<Tooltip
					formatter={(value, name) => {
						const color =
							name === 'In Order'
								? 'hsl(var(--chart-2))'
								: name === 'Not In Order'
									? 'hsl(var(--chart-1))'
									: 'hsl(var(--text))';
						return [
							<span
								style={{ color }}
							>{`${name}: ${value}`}</span>,
						];
					}}
					labelFormatter={(label) => `#${label}`}
					contentStyle={{
						backgroundColor: 'hsl(var(--form))',
						borderRadius: '8px',
						color: 'hsl(var(--text))',
						border: '1px solid hsl(var(--text))',
						fontSize: 18,
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
						padding: '10px',
					}}
					cursor={{ fill: 'hsl(var(--muted))' }}
				/>
				<Brush
					dataKey="number"
					height={40}
					stroke="hsl(var(--brush))"
					fill="hsl(var(--brush-fill))"
				>
					<BarChart data={data}>
						<YAxis domain={['auto', 'auto']} hide />
						<Bar
							dataKey="inOrder"
							fill="hsl(var(--chart-2))"
							name="In Order"
							hide={!lineProps.inOrder}
						/>
						<Bar
							dataKey="notInOrder"
							fill="hsl(var(--chart-1))"
							name="Not In Order"
							hide={!lineProps.notInOrder}
						/>
					</BarChart>
				</Brush>
				<Bar
					dataKey="inOrder"
					fill="hsl(var(--chart-2))"
					name="In Order"
					hide={!lineProps.inOrder}
				/>
				<Bar
					dataKey="notInOrder"
					fill="hsl(var(--chart-1))"
					name="Not In Order"
					hide={!lineProps.notInOrder}
				/>
				<Legend
					onClick={selectLine}
					align="right"
					wrapperStyle={{
						cursor: 'pointer',
					}}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

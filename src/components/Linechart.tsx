import {
	LineChart,
	Line,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	YAxis,
	Brush,
	Legend,
} from 'recharts';

import {
	useReadingsStore,
	processReadingsOrder,
} from '../stores/readings.store';
import { useState } from 'react';
import { toUTCFormat } from '../lib/utils';

export default function Linechart() {
	const { timestampReadings, domainStart } = useReadingsStore();

	const data = timestampReadings.map((reading, index) => {
		const time = new Date(reading.timestamp.$date);
		time.setMinutes(0, 0, 0);

		return {
			createdAt: new Date(reading.createdAt.$date).getTime(),
			timestamp: new Date(reading.timestamp.$date).getTime(),
			time: time.getTime(),
			readingId: reading._id.$oid,
			readingNumber: (domainStart || 1) + index,
		};
	});

	const [lineProps, setLineProps] = useState({
		timestamp: true,
		createdAt: true,
	});

	const selectLine = (data: { value: string }) => {
		const dataKey = data.value === 'Created At' ? 'createdAt' : 'timestamp';
		if (dataKey === 'timestamp' || dataKey === 'createdAt') {
			setLineProps({
				...lineProps,
				[dataKey]: !lineProps[dataKey],
			});
		}
	};

	const { oneYear } = processReadingsOrder(
		new Date(), // Replace with the desired date
		timestampReadings, // Use the readings from the store
		timestampReadings // Replace with createdAtReadings if available separately
	);
	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 40,
					bottom: 40,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="readingNumber"
					label={{
						value: 'Reading Number',
						style: { textAnchor: 'middle' },
						position: 'insideBottom',
						offset: -75,
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
					dataKey="timestamp"
					tickFormatter={(tick) => {
						const date = new Date(tick);
						if (oneYear) {
							// If all timestamps are in the same year, omit the year
							return date.toLocaleDateString('default', {
								month: 'numeric',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							});
						} else {
							// Otherwise, include the year
							return date.toLocaleDateString('default', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							});
						}
					}}
					label={{
						value: 'Timestamp',
						style: { textAnchor: 'middle' },
						fontSize: 16,
						fill: 'hsl(var(--text))',
						angle: -90,
						position: 'left',
						offset: 25,
					}}
					tick={{
						fill: 'hsl(var(--text))',
						fontSize: 14,
					}}
					domain={['auto', 'auto']}
					padding={{ top: 20, bottom: 20 }}
				/>
				<Brush
					dataKey="readingNumber"
					height={40}
					stroke="hsl(var(--brush))"
					fill="hsl(var(--brush-fill))"
				>
					<LineChart data={data}>
						<YAxis domain={['auto', 'auto']} hide />
						<Line
							dataKey="timestamp"
							stroke="hsl(var(--chart-2))"
							strokeWidth={1}
							dot={false}
							hide={!lineProps.timestamp}
						/>
						<Line
							dataKey="createdAt"
							stroke="hsl(var(--chart-1))"
							strokeWidth={1}
							dot={false}
							hide={!lineProps.createdAt}
						/>
					</LineChart>
				</Brush>
				<Tooltip
					formatter={(value, name) => {
						return [
							`${toUTCFormat(new Date(value as number))}`,
							`${name}`,
						];
					}}
					labelFormatter={(_, payload) => {
						if (!payload.length) return '';

						const data = payload[0].payload;

						const createdAt = new Date(data.createdAt as number);
						const timestamp = new Date(data.timestamp as number);

						// Calculate the difference in milliseconds
						const diffInMs =
							createdAt.getTime() - timestamp.getTime();

						// Calculate days, hours, minutes, and seconds
						const days = Math.floor(diffInMs / 86400000); // 86400000 ms in 1 day
						const hours = Math.floor(
							(diffInMs % 86400000) / 3600000
						); // 3600000 ms in 1 hour
						const minutes = Math.floor(
							(diffInMs % 3600000) / 60000
						); // 60000 ms in 1 minute
						const seconds = Math.floor((diffInMs % 60000) / 1000); // 1000 ms in 1 second

						let formattedTime: string;

						// Format the time with days if there are any
						if (days > 0) {
							formattedTime = `${days}d ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
						} else if (hours > 0) {
							formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
						} else {
							formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
						}

						return `Delay: ${formattedTime} | ID: ${data.readingId} | #${data.readingNumber}`;
					}}
					contentStyle={{
						backgroundColor: 'hsl(var(--form))',
						borderRadius: '8px',
						border: '1px solid hsl(var(--text))',
						color: 'hsl(var(--text))',
						fontSize: 18,
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
						padding: '10px',
					}}
					itemStyle={{
						fontSize: 18,
					}}
				/>
				<Line
					dataKey="timestamp"
					stroke="hsl(var(--chart-2))"
					name="Timestamp"
					strokeWidth={2}
					dot={false}
					hide={!lineProps.timestamp}
				/>
				<Line
					dataKey="createdAt"
					stroke="hsl(var(--chart-1))"
					name="Created At"
					strokeWidth={2}
					dot={false}
					hide={!lineProps.createdAt}
				/>
				<Legend
					onClick={selectLine}
					align="right"
					wrapperStyle={{
						cursor: 'pointer',
					}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

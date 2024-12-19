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

import { useReadingsStore } from '../stores/readings.store';
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

	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="readingNumber"
					label={{
						value: 'Reading Number',
						position: 'insideBottom',
						offset: -5,
					}}
				/>
				<YAxis
					dataKey="timestamp"
					tickFormatter={(tick) => toUTCFormat(new Date(tick))}
					label={{
						value: 'Timestamp',
						angle: -90,
						position: 'insideLeft',
					}}
					domain={['auto', 'auto']}
				/>
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
				/>
				<Brush dataKey="readingNumber" height={30} stroke="#8884d8" />

				<Line
					dataKey="timestamp"
					stroke="#00ff00"
					name="Timestamp"
					strokeWidth={2}
					dot={false}
					hide={!lineProps.timestamp}
				/>
				<Line
					dataKey="createdAt"
					stroke="#ff7300"
					name="Created At"
					strokeWidth={2}
					dot={false}
					hide={!lineProps.createdAt}
				/>

				<Legend onClick={selectLine} />
			</LineChart>
		</ResponsiveContainer>
	);
}

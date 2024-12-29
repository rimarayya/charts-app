import { create } from 'zustand';
import allReadings from '../data/messed-up-map-readings.json';
import { IReading } from '../types/reading.type';

interface ReadingsStore {
	/**
	 * The reading number that the range start from.
	 */
	domainStart: number | null;
	/**
	 * The reading number that the range end at.
	 */
	domainEnd: number | null;

	/**
	 * The user's readings first timestamp.
	 *
	 * Will be used to check the in-order & not in-order readings.
	 */
	referenceTimestamp: Date | null;
	/**
	 * The not in ordered count of the readings.
	 */
	notInOrderCount: number;
	/**
	 * The in ordered count of the readings.
	 */
	inOrderCount: number;
	/**
	 * The in total count of the readings.
	 */
	totalReadingsInDomain: number;

	/**
	 * All the readings sorted by timestamp.
	 */
	timestampReadings: IReading[];
	/**
	 * All the readings sorted by created at.
	 */
	createdAtReadings: IReading[];

	setReferenceTimestamp(date: Date): void;

	setDomain(start: number | null, end: number | null): void;
}

export function processReadingsOrder(
	date: Date,
	readings: IReading[],
	createdAtReadings: IReading[]
) {
	const referenceDateTime = date;

	const notInOrderedTimestamps: Array<Date> = [];

	let comparisonDate = referenceDateTime;

	// Assume all readings are in the same year initially
	let oneYear = true;

	if (createdAtReadings.length > 0) {
		const firstYear = new Date(
			createdAtReadings[0].timestamp.$date
		).getFullYear();

		for (let i = 0; i < createdAtReadings.length; i++) {
			const readingTimestamp = new Date(
				createdAtReadings[i].timestamp.$date
			);
			const readingYear = readingTimestamp.getFullYear();

			// Check if this reading's year differs from the first year
			if (readingYear !== firstYear) {
				oneYear = false;
			}

			// Check if this reading is out of order
			if (readingTimestamp < comparisonDate) {
				notInOrderedTimestamps.push(readingTimestamp);
			} else {
				comparisonDate = readingTimestamp;
			}
		}
	}

	// Calculate counts
	const notInOrderCount = notInOrderedTimestamps.length;
	const totalReadingsInDomain = readings.length;
	const inOrderCount = totalReadingsInDomain - notInOrderCount;
	return {
		notInOrderCount,
		inOrderCount,
		totalReadingsInDomain,
		oneYear, // true if all readings are in the same year
	};
}

export const useReadingsStore = create<ReadingsStore>((set) => {
	return {
		domainStart: 0,
		domainEnd: null,

		referenceTimestamp: null,
		notInOrderCount: 0,
		inOrderCount: 0,
		totalReadingsInDomain: 0,

		createdAtReadings: [],
		timestampReadings: [],

		setReferenceTimestamp: (date: Date) => {
			const readings = allReadings as IReading[];
			set((oldState) => {
				const readingsOrderState = processReadingsOrder(
					date,
					readings,
					oldState.createdAtReadings
				);
				return {
					...oldState,
					referenceTimestamp: date, // Update the reference timestamp explicitly
					...readingsOrderState, // Merge the processed readings state
				};
			});
		},

		setDomain: (start: number | null, end: number | null) => {
			const slicedReadings = (allReadings as IReading[]).slice(
				start ? start - 1 : 0,
				end || undefined
			);
			const firstTimestampInSlice = slicedReadings.reduce(
				(earliest, current) => {
					const currentTimestamp = new Date(current.timestamp.$date);
					return currentTimestamp < earliest
						? currentTimestamp
						: earliest;
				},
				new Date(slicedReadings[0].timestamp.$date)
			);

			const createdAtReadings = [...slicedReadings].sort(
				(a, b) =>
					new Date(a.createdAt.$date).getTime() -
					new Date(b.createdAt.$date).getTime()
			);
			const timestampReadings = [...slicedReadings].sort(
				(a, b) =>
					new Date(a.timestamp.$date).getTime() -
					new Date(b.timestamp.$date).getTime()
			);
			set((oldState) => {
				const readingsOrderState = oldState.referenceTimestamp
					? processReadingsOrder(
							oldState.referenceTimestamp,
							slicedReadings,
							createdAtReadings
						)
					: {};

				return {
					domainStart: start,
					domainEnd: end,
					referenceTimestamp: firstTimestampInSlice,
					createdAtReadings,
					timestampReadings,
					...readingsOrderState,
				};
			});
		},
	};
});

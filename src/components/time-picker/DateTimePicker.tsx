import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { TimePickerDemo } from './TimePickerDemo';
import { useEffect, useState } from 'react';
import { useReadingsStore } from '../../stores/readings.store';

interface DateTimePickerProps {
	onRightDateChange: (date: Date) => void;
}

export function DateTimePicker({ onRightDateChange }: DateTimePickerProps) {
	const [date, setDate] = useState<Date>();

	const { referenceTimestamp } = useReadingsStore();

	useEffect(() => {
		// Initialize the state with the referenceTimestamp if available
		if (referenceTimestamp) {
			setDate(referenceTimestamp);
		}
	}, [referenceTimestamp]);

	function setDateEnsureLocal(newDate: Date | undefined) {
		if (!newDate) return;
		setDate(newDate);

		const utcDateString = newDate.toLocaleString() + ' UTC';

		const myDate = new Date(utcDateString);

		// Notify the parent about the updated rightDate
		onRightDateChange(myDate);
	}

	// Carry over the current time when a user clicks a new day
	const handleSelect = (newDay: Date | undefined) => {
		if (!newDay) return;

		const isSameDate = date && newDay.getTime() == date.getTime();
		if (isSameDate) return;

		if (date) {
			// Extract time components from the source date
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const seconds = date.getSeconds();
			const milliseconds = date.getMilliseconds();

			// Set time components to the target date
			newDay.setHours(hours, minutes, seconds, milliseconds);
		}

		setDateEnsureLocal(newDay);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, 'PPP HH:mm:ss')
					) : referenceTimestamp ? (
						format(referenceTimestamp, 'PPP HH:mm:ss')
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					defaultMonth={referenceTimestamp || undefined}
					onSelect={(d) => handleSelect(d)}
					initialFocus
					disabled={(date) =>
						date > new Date() || date < new Date('1900-01-01')
					}
				/>
				<div className="p-3 border-t border-border">
					<TimePickerDemo setDate={setDateEnsureLocal} date={date} />
				</div>
			</PopoverContent>
		</Popover>
	);
}

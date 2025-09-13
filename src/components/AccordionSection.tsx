import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import { ReactNode } from 'react';

interface AccordionSectionProps {
	accordionTriggerTitle: string;
	accordionContent: ReactNode;
}

export default function AccordionSection({
	accordionTriggerTitle,
	accordionContent,
}: AccordionSectionProps) {
	return (
		<div className="mx-5">
			<Accordion
				type="single"
				collapsible
				defaultValue={accordionTriggerTitle}
			>
				<AccordionItem value={accordionTriggerTitle}>
					<AccordionTrigger className="text-base text-text no-underline hover:no-underline">
						{accordionTriggerTitle}
					</AccordionTrigger>
					<AccordionContent>{accordionContent}</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

export interface IReading {
	_id: { $oid: string };
	createdAt: { $date: string };
	timestamp: { $date: string };
	[key: string]: unknown;
}

import { startOfWeek, toDateAtTime } from './utils.js';

export function generateWeekSlots(reference = new Date(), options = {}) {
	const { days = 7, duration = 60, rangeStart = '08:00', rangeEnd = '18:00' } = options;
	const first = startOfWeek(reference);
	const slots = [];

	for (let d = 0; d < days; d++) {
		const dayDate = new Date(first);
		dayDate.setDate(first.getDate() + d);

		let cursor = toDateAtTime(dayDate, rangeStart);
		const endTime = toDateAtTime(dayDate, rangeEnd);
		while (cursor < endTime) {
			const slotIso = cursor.toISOString();
			slots.push({ id: slotIso, datetime: slotIso, label: cursor.toLocaleString(), isBusy: false });
			cursor = new Date(cursor.getTime() + duration * 60000);
		}
	}

	return slots;
}

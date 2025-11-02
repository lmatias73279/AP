export function uid(prefix = '') {
	return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

export function todayISO() {
	const d = new Date();
	return d.toISOString();
}

export function startOfWeek(date = new Date()) {
	const d = new Date(date);
	const day = d.getDay();
	const diff = d.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(d.setDate(diff));
}

export function formatDateLocal(iso) {
	if (!iso) return '';
	const d = new Date(iso);
	return d.toLocaleString();
}

export function timeLabel(iso) {
	const d = new Date(iso);
	return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function toDateAtTime(dateObj, hhmm) {
	const [hh, mm] = hhmm.split(':').map(Number);
	const d = new Date(dateObj);
	d.setHours(hh, mm, 0, 0);
	return d;
}

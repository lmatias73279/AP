import { setItem } from '../storage.js';
import { generateWeekSlots } from '../schedule.js';
import { createAppointment } from '../appointments.js';

/**
 * seedDemo - populate LocalStorage with a few example appointments
 * Usage: import and call seedDemo(); or open console and run `seedDemo()` (window.seedDemo is provided)
 */
export async function seedDemo({ clear = true } = {}) {
	// clear existing appointments key
	if (clear) {
		setItem('ap_appointments_v1', []);
	}

	const slots = generateWeekSlots(new Date(), { duration: 60, rangeStart: '09:00', rangeEnd: '17:00' });
	// pick a few sample slots (if there are enough)
	const picks = [2, 5, 9].map((i) => (i < slots.length ? slots[i].id : null)).filter(Boolean);

	const samples = [
		{ nombre: 'María Pérez', correo: 'maria.perez@example.com', motivo: 'Consulta inicial' },
		{ nombre: 'Juan López', correo: 'juan.lopez@example.com', motivo: 'Seguimiento' },
		{ nombre: 'Laura Ruiz', correo: 'laura.ruiz@example.com', motivo: 'Asesoría' },
	];

	const created = [];
	for (let i = 0; i < samples.length; i++) {
		const s = samples[i];
		const slot = picks[i] || slots[(i * 2) % slots.length].id;
		const item = createAppointment(Object.assign({}, s, { slot }));
		created.push(item);
	}

	return created;
}

// Convenience: expose to window for quick manual seeding from the browser console
if (typeof window !== 'undefined') window.seedDemo = seedDemo;

export default seedDemo;


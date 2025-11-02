import { timeLabel } from './utils.js';
import { findBySlot } from './appointments.js';

export function renderCalendar(container, slots = [], selectedSlot = null, onSlotSelect = () => {}) {
	const el = typeof container === 'string' ? document.querySelector(container) : container;
	if (!el) return;
	el.innerHTML = '';

	const grid = document.createElement('div');
	grid.className = 'calendar';

	slots.forEach((s) => {
		const cell = document.createElement('div');
		cell.className = 'slot';
		cell.dataset.slot = s.id;
		const booked = findBySlot(s.id);
		if (booked) {
			cell.classList.add('is-busy');
			cell.title = `Reservado por ${booked.nombre}`;
		}
		if (selectedSlot === s.id) cell.classList.add('is-selected');
		cell.textContent = timeLabel(s.datetime);
		cell.addEventListener('click', (e) => {
			if (booked) return;
			const prev = el.querySelector('.slot.is-selected');
			if (prev) prev.classList.remove('is-selected');
			cell.classList.add('is-selected');
			onSlotSelect(s.id);
		});
		grid.appendChild(cell);
	});

	el.appendChild(grid);
}


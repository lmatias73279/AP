import { allAppointments, deleteAppointment } from './appointments.js';
import { formatDateLocal } from './utils.js';

export function renderAppointmentsList(containerSelector) {
	const el = document.querySelector(containerSelector);
	if (!el) return;
	const list = allAppointments();
	if (!list.length) {
		el.innerHTML = '<p class="muted">No hay citas registradas</p>';
		return;
	}
	const table = document.createElement('table');
	table.className = 'table';
	table.innerHTML = `
		<thead><tr><th>Nombre</th><th>Correo</th><th>Horario</th><th>Acciones</th></tr></thead>
	`;
	const tbody = document.createElement('tbody');
	list.forEach((a) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${a.nombre}</td>
			<td>${a.correo}</td>
			<td>${formatDateLocal(a.slot)}</td>
			<td><button class="btn btn-sm btn-outline-secondary btn-delete" data-id="${a.id}">Eliminar</button></td>
		`;
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);
	el.innerHTML = '';
	el.appendChild(table);

	el.querySelectorAll('.btn-delete').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const id = btn.dataset.id;
			if (!confirm('Eliminar cita?')) return;
			deleteAppointment(id);
			renderAppointmentsList(containerSelector);
		});
	});
}

export function renderResumen(containerSelector) {
	renderAppointmentsList(containerSelector);
}

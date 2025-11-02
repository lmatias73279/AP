import { createAppointment, findBySlot } from './appointments.js';
import { validateAppointment } from './validators.js';
import { renderResumen } from './dom.js';
import { renderCalendar } from './calendar.js';
import { generateWeekSlots } from './schedule.js';

function getSelectedSlot() {
	const el = document.getElementById('slot-seleccionado');
	return el ? el.value : null;
}

function setSelectedSlot(val) {
	const el = document.getElementById('slot-seleccionado');
	if (el) el.value = val;
}

export function bindCitaForm() {
	const form = document.getElementById('form-cita');
	const calendarioEl = document.getElementById('calendario');
	if (!form || !calendarioEl) return;

	const slots = generateWeekSlots(new Date(), { duration: 60, rangeStart: '08:00', rangeEnd: '18:00' });
	renderCalendar(calendarioEl, slots, null, (slotId) => {
		setSelectedSlot(slotId);
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(form);
		const data = Object.fromEntries(fd.entries());
		data.slot = getSelectedSlot();
		const errors = validateAppointment(data);
		if (Object.keys(errors).length) {
			alert(Object.values(errors).join('\n'));
			return;
		}
		if (findBySlot(data.slot)) {
			alert('Lo siento, este horario ya fue reservado.');
			return;
		}
		createAppointment(data);
		alert('Reserva creada');
		form.reset();
		setSelectedSlot('');
		renderResumen('#resumen');
		renderCalendar(calendarioEl, slots, null, (slotId) => setSelectedSlot(slotId));
	});
}

export function bindRegistroForm() {
	const form = document.getElementById('form-registro');
	if (!form) return;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Registro simulado. En el demo los usuarios se validan en localStorage.');
		form.reset();
	});
}

export function bindLoginForm() {
	const form = document.getElementById('form-login');
	if (!form) return;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Login simulado. Redirigiendo a panel...');
		window.location.href = 'panel.html';
	});
}

export function bindHorariosForm() {
	const form = document.getElementById('form-horarios');
	if (!form) return;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Horarios guardados (simulado).');
	});
}


import { bindCitaForm, bindRegistroForm, bindLoginForm, bindHorariosForm } from './events.js';
import { renderResumen } from './dom.js';

function setYear() {
	const y = new Date().getFullYear();
	document.querySelectorAll('#anio').forEach((el) => (el.textContent = y));
}

function init() {
	setYear();
	bindCitaForm();
	bindRegistroForm();
	bindLoginForm();
	bindHorariosForm();
	renderResumen('#resumen');
}

document.addEventListener('DOMContentLoaded', init);

import { allAppointments, createAppointment, updateAppointment, deleteAppointment, findBySlot } from './appointments.js';
import { generateWeekSlots } from './schedule.js';

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export async function fetchAppointments() {
  await delay(180);
  return allAppointments();
}

export async function createAppointmentAPI(data) {
  await delay(220);
  if (findBySlot(data.slot)) {
    const err = new Error('Slot already booked');
    err.code = 'SLOT_TAKEN';
    throw err;
  }
  return createAppointment(data);
}

export async function updateAppointmentAPI(id, patch) {
  await delay(160);
  return updateAppointment(id, patch);
}

export async function deleteAppointmentAPI(id) {
  await delay(120);
  return deleteAppointment(id);
}

export async function fetchSlots(options = {}) {
  await delay(140);
  return generateWeekSlots(new Date(), options);
}

export default {
  fetchAppointments,
  createAppointmentAPI,
  updateAppointmentAPI,
  deleteAppointmentAPI,
  fetchSlots,
};
import { allAppointments, createAppointment, deleteAppointment, findBySlot } from './appointments.js';
import { generateWeekSlots } from './schedule.js';

const SIMULATED_DELAY = 200; // ms

function wait(ms = SIMULATED_DELAY) {
	return new Promise((res) => setTimeout(res, ms));
}

export async function fetchSlots(options = {}) {
	await wait();
	return generateWeekSlots(new Date(), options);
}

export async function fetchAppointments() {
	await wait();
	return allAppointments();
}

export async function postAppointment(data) {
	await wait();
	// simple conflict check
	if (data.slot && findBySlot(data.slot)) {
		const err = new Error('Slot already booked');
		err.code = 'CONFLICT';
		throw err;
	}
	return createAppointment(data);
}

export async function removeAppointment(id) {
	await wait();
	return deleteAppointment(id);
}

export async function stats() {
	await wait();
	const list = allAppointments();
	const proximas = list.filter((a) => new Date(a.slot) > new Date()).length;
	const canceladas = list.filter((a) => a.status === 'cancelada').length;
	const completadas = list.filter((a) => a.status === 'completada').length;
	return { total: list.length, proximas, canceladas, completadas };
}


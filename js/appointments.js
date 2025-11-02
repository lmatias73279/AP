import { getItem, setItem } from './storage.js';
import { uid, formatDateLocal } from './utils.js';

const KEY = 'ap_appointments_v1';

export function allAppointments() {
	return getItem(KEY, []);
}

function saveAll(list) {
	return setItem(KEY, list);
}

export function createAppointment(data) {
	const list = allAppointments();
	const item = Object.assign({}, data, { id: uid('ap_'), createdAt: new Date().toISOString() });
	list.push(item);
	saveAll(list);
	return item;
}

export function updateAppointment(id, patch) {
	const list = allAppointments();
	const idx = list.findIndex((x) => x.id === id);
	if (idx === -1) return null;
	list[idx] = Object.assign({}, list[idx], patch);
	saveAll(list);
	return list[idx];
}

export function deleteAppointment(id) {
	const list = allAppointments();
	const n = list.filter((x) => x.id !== id);
	saveAll(n);
	return true;
}

export function findBySlot(slotIso) {
	const list = allAppointments();
	return list.find((a) => a.slot === slotIso);
}


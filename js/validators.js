export function isEmail(value) {
	if (!value) return false;
	return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export function required(value) {
	if (value === null || value === undefined) return false;
	if (typeof value === 'string') return value.trim().length > 0;
	return true;
}

export function minLength(value, n) {
	if (!value) return false;
	return String(value).trim().length >= n;
}

export function validateAppointment(formData = {}) {
	const errors = {};
	if (!required(formData.nombre)) errors.nombre = 'Nombre requerido';
	if (!isEmail(formData.correo)) errors.correo = 'Email inválido';
	if (!required(formData.slot)) errors.slot = 'Selecciona un horario';
	return errors;
}

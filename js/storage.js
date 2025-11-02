export function getItem(key, defaultValue = null) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : defaultValue;
	} catch (e) {
		console.error('storage.getItem error', e);
		return defaultValue;
	}
}

export function setItem(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (e) {
		console.error('storage.setItem error', e);
		return false;
	}
}

export function removeItem(key) {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (e) {
		console.error('storage.removeItem error', e);
		return false;
	}
}

export function clearAll() {
	try {
		localStorage.clear();
		return true;
	} catch (e) {
		console.error('storage.clearAll error', e);
		return false;
	}
}

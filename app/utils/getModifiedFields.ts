export function getModifiedFields<T extends Record<string, any>>(original: T, updated: T): Partial<T> {
	const modified: Partial<T> = {};

	const isFile = (val: unknown): val is File => typeof File !== "undefined" && val instanceof File;

	const isObject = (val: unknown): val is Record<string, any> =>
		val !== null && typeof val === "object" && !isFile(val);

	const deepEqual = (a: any, b: any): boolean => {
		if (a === b) return true;
		if (typeof a !== typeof b) return false;

		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return false;
			return a.every((item, i) => deepEqual(item, b[i]));
		}

		if (isObject(a) && isObject(b)) {
			const keysA = Object.keys(a);
			const keysB = Object.keys(b);
			if (keysA.length !== keysB.length) return false;

			return keysA.every(key => deepEqual(a[key], b[key]));
		}

		return false;
	};

	for (const key in updated) {
		const value = updated[key];
		const originalValue = original[key];

		if (isFile(value)) {
			modified[key] = value;
		} else if (isObject(value)) {
			if (!deepEqual(value, originalValue)) {
				modified[key] = JSON.stringify(value) as T[typeof key];
			}
		} else if (value !== originalValue) {
			modified[key] = value;
		}
	}

	return modified;
}

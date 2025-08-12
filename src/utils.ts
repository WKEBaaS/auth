export const isEnabled = (env?: string): boolean => {
	if (!env) {
		return false;
	}

	return env === 'true' || env === '1';
};

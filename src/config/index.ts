const trustedOrigins = Bun.env.TRUSTED_ORIGINS?.split(',') || undefined;

export const config = {
	trustedOrigins: trustedOrigins,
};

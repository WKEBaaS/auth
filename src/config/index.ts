import { isEnabled } from '@/utils';

const trustedOrigins = Bun.env.TRUSTED_ORIGINS?.split(',') || undefined;

export const config = {
	server: {
		port: parseInt(Bun.env.PORT || '3000', 10),
	},
	auth: {
		trustedOrigins: trustedOrigins,
		url: Bun.env.AUTH_URL,
		secret: Bun.env.AUTH_SECRET,
		emailAndPasswordEnabled: isEnabled(Bun.env.EMAIL_AND_PASSWORD_ENABLED),
		jwt: {
			expirationTime: Bun.env.JWT_EXPIRATION_TIME || '15m',
		},
	},
};

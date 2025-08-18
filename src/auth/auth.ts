import { config } from '@/config';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { sso } from '@better-auth/sso';
import { I3S } from '@youmin1017/better-auth-i3s';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer, jwt, openAPI } from 'better-auth/plugins';

const options = {
	secret: config.auth.secret,
	trustedOrigins: config.auth.trustedOrigins,
	database: drizzleAdapter(db, {
		provider: 'pg',
		usePlural: true,
		schema: schema,
	}),
	advanced: {
		database: {
			generateId: () => Bun.randomUUIDv7(),
		},
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: 'authenticated',
				returned: true,
			},
		},
	},
	emailAndPassword: {
		enabled: config.auth.emailAndPasswordEnabled,
	},
	plugins: [
		I3S(),
		openAPI(),
		bearer(),
		sso(),
		jwt({
			schema: {
				jwks: {
					modelName: 'jwk',
				},
			},
			jwt: {
				expirationTime: config.auth.jwt.expirationTime,
				definePayload({ user }) {
					return {
						role: user.role,
						email: user.email,
						emailVerified: user.emailVerified,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
						image: user.image,
					};
				},
			},
		}),
	],
} satisfies BetterAuthOptions;

export const auth = betterAuth(options);

import { config } from '@/config';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { sso } from '@better-auth/sso';
import { I3S } from '@youmin1017/better-auth-i3s';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer, jwt, openAPI } from 'better-auth/plugins';
import { genSocialProviders } from './providers';

const options = {
	trustedOrigins: config.trustedOrigins,
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
	emailAndPassword: {
		enabled: false,
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
		}),
	],
	socialProviders: genSocialProviders(),
} satisfies BetterAuthOptions;

export const auth = betterAuth(options);

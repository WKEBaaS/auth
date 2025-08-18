import { sql } from 'drizzle-orm';
import { boolean, integer, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');
const dboSchema = pgSchema('dbo');

export const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified')
		.$defaultFn(() => !1)
		.notNull(),
	role: text('role')
		.default('authenticated'),
	image: text('image'),
	createdAt: timestamp('created_at')
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
});

export const sessions = authSchema.table('sessions', {
	id: uuid('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = authSchema.table('accounts', {
	id: uuid('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const verifications = authSchema.table('verifications', {
	id: uuid('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
});

export const jwks = authSchema.table('jwks', {
	id: uuid('id').primaryKey(),
	publicKey: text('public_key').notNull(),
	privateKey: text('private_key').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => new Date()).notNull(),
});

export const ssoProviders = authSchema.table('sso_providers', {
	id: uuid('id').primaryKey().default(sql`uuidv7()`),
	issuer: text('issuer').notNull(),
	domain: text('domain').notNull(),
	oidcConfig: text('oidc_config'),
	samlConfig: text('saml_config'),
	userId: text('user_id').notNull(),
	providerId: text('provider_id').notNull(),
	organizationId: text('organization_id'),
});

export const objects = dboSchema.table('objects', {
	id: uuid('id').primaryKey(),
	entityId: integer('entity_id'),
});

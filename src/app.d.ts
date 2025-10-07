declare module 'bun' {
	interface Env {
		BETTER_AUTH_URL: string; // Base URL of your app
		BETTER_AUTH_SECRET: string; // Secret key for signing tokens
		DATABASE_URL: string; // Database connection string
		// Optional Configurations
		// Social Providers
		PORT?: string; // Port to run the server on
		JWT_ENABLED?: string; // Enable JWT authentication
		JWT_EXPIRATION_TIME?: string; // JWT expiration time (e.g., '15m', '1h')
		EMAIL_AND_PASSWORD_ENABLED?: string; // Enable email/password authentication
		TRUSTED_ORIGINS?: string; // Comma-separated list of trusted origins for CORS
	}
}

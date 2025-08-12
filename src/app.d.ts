declare module 'bun' {
	interface Env {
		BETTER_AUTH_URL: string; // Base URL of your app
		BETTER_AUTH_SECRET: string; // Secret key for signing tokens
		DATABASE_URL: string; // Database connection string
		// Optional Configurations
		// Social Providers
		PORT?: string; // Port to run the server on
		JWT_ENABLED?: string; // Enable JWT authentication
		EMAIL_AND_PASSWORD_ENABLED?: string; // Enable email/password authentication
		TRUSTED_ORIGINS?: string; // Comma-separated list of trusted origins for CORS
		GOOGLE_ENABLED?: string; // Enable Google authentication
		GOOGLE_CLIENT_ID?: string;
		GOOGLE_CLIENT_SECRET?: string;
		GIRHUB_ENABLED?: string; // Enable Facebook authentication
		GITHUB_CLIENT_ID?: string;
		GITHUB_CLIENT_SECRET?: string;
		DISCORD_ENABLED?: string; // Enable Discord authentication
		DISCORD_CLIENT_ID?: string;
		DISCORD_CLIENT_SECRET?: string;
	}
}

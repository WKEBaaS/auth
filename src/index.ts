import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { auth, OpenAPI } from '@/auth';
import { swagger } from '@elysiajs/swagger';
import { config } from '@/config';

// TODO: wait the pull request elysiajs/elysia-swagger#224 is merged
// Then we can just use swagger with config { path: '/api/auth/docs' }
// For now, we use a custom prefix for the docs route
const docs = new Elysia({ prefix: '/api/auth' })
	.use(swagger({
		path: '/docs',
		documentation: {
			components: await OpenAPI.components,
			paths: await OpenAPI.getPaths(),
		},
	}));

const app = new Elysia()
	.use(cors({
		origin: config.trustedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}))
	.use(docs)
	.get('/', () => 'Welcome to the Elysia Auth API!')
	.mount(auth.handler)
	.listen(Bun.env.PORT || 3000);

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
	process.exit(0);
});
// Handle SIGTERM gracefully (e.g., for Docker/Kubernetes)
process.on('SIGTERM', () => {
	process.exit(0);
});

console.log(
	`🦊 Elysia auth api is running at ${app.server?.hostname}:${app.server?.port}`,
);

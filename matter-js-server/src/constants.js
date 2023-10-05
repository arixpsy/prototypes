export const Environment = Object.freeze({
	DEV: 'dev',
	PROD: 'prod',
})

export const Env = {
	ENV: process.env.ENV ?? Environment.DEV,
	PORT: process.env.PORT ?? '3000',
	FE_BASE_URL: process.env.FE_BASE_URL ?? '',
}

export const CorsOrigin = {
	[Environment.DEV]: ['http://localhost:8080'],
	[Environment.PROD]: [Env.FE_BASE_URL],
}


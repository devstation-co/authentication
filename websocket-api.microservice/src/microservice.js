import WebsocketApi from './module';

(async () => {
	const websocketApi = new WebsocketApi({
		infrastructure: {
			logger: {
				env: process.env.NODE_ENV,
				source: process.env.MICROSERVICE_NAME,
			},
			commandBus: {
				dependencies: ['logger'],
				nats: {
					host: process.env.NATS_HOST,
					port: process.env.NATS_PORT,
					username: process.env.NATS_USERNAME,
					password: process.env.NATS_PASSWORD,
				},
				init: true,
			},
			websocketServer: {
				port: process.env.WEBSOCKET_SERVER_PORT,
				redis: {
					port: process.env.REDIS_PORT,
					host: process.env.REDIS_HOST,
					password: process.env.REDIS_PASSWORD,
					db: process.env.REDIS_DB,
				},
				init: true,
			},
			idempotency: {
				maxAge: 2 * 24 * 60 * 60 * 1000,
				init: false,
			},
			httpApiClient: {
				baseUrl: 'https://gitlab.com/api/v4/',
				headers: {
					'private-token': 'MNxEQhwQi7MHi-DTNysk',
					'Content-Type': 'application/json',
				},
				timeout: 10000,
			},
		},
	});
	const interfaces = ['websocket'];
	await websocketApi.init();
	const res = await websocketApi.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		websocketApi.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		websocketApi.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		websocketApi.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: { reason },
		});
	});
	process.on('uncaughtException', (error) => {
		websocketApi.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();

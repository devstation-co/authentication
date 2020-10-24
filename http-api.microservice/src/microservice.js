import AuthenticationHttpApiModule from './module';

(async () => {
	const authenticationHttpApi = new AuthenticationHttpApiModule({
		infrastructure: {
			logger: {
				env: 'prod',
				source: 'authentication.http-api',
			},
			webServer: {
				port: process.env.WEB_SERVER_PORT,
				redis: {
					port: process.env.REDIS_PORT,
					host: process.env.REDIS_HOST,
					password: process.env.REDIS_PASSWORD,
					db: 0,
				},
				init: true,
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
		},
	});
	const interfaces = ['http'];
	await authenticationHttpApi.init();
	const res = await authenticationHttpApi.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		authenticationHttpApi.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		authenticationHttpApi.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		authenticationHttpApi.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		authenticationHttpApi.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();

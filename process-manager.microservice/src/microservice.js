import AuthenticationProjectionModule from './module';

(async () => {
	const authenticationProjectionModule = new AuthenticationProjectionModule({
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
			eventBus: {
				dependencies: ['logger'],
				nats: {
					host: process.env.NATS_HOST,
					port: process.env.NATS_PORT,
					username: process.env.NATS_USERNAME,
					password: process.env.NATS_PASSWORD,
				},
				init: true,
			},
			websocketEmitter: {
				redis: {
					port: process.env.REDIS_PORT,
					host: process.env.REDIS_HOST,
					password: process.env.REDIS_PASSWORD,
					db: 0,
				},
				init: true,
			},
		},
	});
	const interfaces = ['events'];
	await authenticationProjectionModule.init();
	const res = await authenticationProjectionModule.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		authenticationProjectionModule.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		authenticationProjectionModule.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		authenticationProjectionModule.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		authenticationProjectionModule.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();

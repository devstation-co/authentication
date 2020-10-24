import AuthenticationCommandsModule from './module';

(async () => {
	const authenticationCommands = new AuthenticationCommandsModule({
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
			eventstore: {
				dependencies: ['commandBus'],
				version: process.env.EVENTSTORE_VERSION,
				token: process.env.EVENTSTORE_TOKEN,
			},
			auth: {
				jwtSecret: process.env.JWT_SECRET,
				saltRound: process.env.SALT_ROUND,
			},
		},
	});
	const interfaces = ['commands'];
	await authenticationCommands.init();
	const res = await authenticationCommands.interface.run({ interfaces });
	if (process.env.NODE_ENV === 'dev')
		authenticationCommands.infrastructure.logger.warn({ message: 'Dev mode activated' });
	if (res.name === 'interfacesRunning')
		authenticationCommands.infrastructure.logger.success({
			message: 'Interfaces running',
			payload: res.payload,
		});
	process.on('unhandledRejection', (reason) => {
		authenticationCommands.infrastructure.logger.error({
			message: 'Unhandled rejection',
			payload: reason,
		});
	});
	process.on('uncaughtException', (error) => {
		authenticationCommands.infrastructure.logger.error({
			message: 'Uncaught exception',
			payload: error,
		});
	});
})();

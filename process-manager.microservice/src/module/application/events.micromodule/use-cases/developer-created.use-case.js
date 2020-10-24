export default function developerCreated({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'createUser',
				handler: 'authentication.commands',
				params: {
					username: params.event.primaryEmail,
				},
			};
			await infrastructure.commandBus.handle(query);
			return true;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'authentication',
					module: 'process-manager',
					layer: {
						name: 'events-api',
						type: 'application',
					},
					method: {
						name: 'developerCreated',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}

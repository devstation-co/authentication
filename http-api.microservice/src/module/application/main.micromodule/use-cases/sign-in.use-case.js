export default function signIn({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'getTokenAndUser',
				handler: 'authentication.projection',
				params: {
					username: params.username,
					password: params.password,
				},
			};
			const response = await infrastructure.commandBus.handle(query);
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				module: 'websocket-api',
				source: {
					service: 'authentication',
					layer: {
						name: 'api',
						type: 'application',
					},
					method: {
						name: 'signIn',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}

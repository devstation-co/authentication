export default function resolveToken({ infrastructure }) {
	return async ({ params }) => {
		try {
			const query = {
				name: 'resolveToken',
				handler: 'authentication.projection',
				params: {
					token: params.token,
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
						name: 'resolveToken',
						type: 'use-case',
					},
				},
			});
			infrastructure.logger.error({ message: error.message });
			return error;
		}
	};
}

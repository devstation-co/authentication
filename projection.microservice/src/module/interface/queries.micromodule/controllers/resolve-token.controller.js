export default function resolveToken({ infrastructure, application }) {
	return async (query) => {
		try {
			const response = await application.queriesApi.resolveToken({
				params: {
					token: query.params.token,
				},
			});
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'authentication',
					module: 'queries',
					layer: {
						name: 'queries-api',
						type: 'interface',
					},
					method: {
						name: 'resolveToken',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}

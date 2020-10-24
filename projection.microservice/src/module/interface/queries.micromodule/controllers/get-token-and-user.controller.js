export default function getTokenAndUser({ infrastructure, application }) {
	return async ({ params }) => {
		try {
			const response = await application.queriesApi.getTokenAndUser({
				params: {
					username: params.username,
					password: params.password,
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
						name: 'getTokenAndUser',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}

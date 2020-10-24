export default function resolveToken({ infrastructure }) {
	return async ({ params }) => {
		try {
			const response = await infrastructure.auth.resolveToken({
				token: params.token,
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
						type: 'application',
					},
					method: {
						name: 'resolveToken',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}

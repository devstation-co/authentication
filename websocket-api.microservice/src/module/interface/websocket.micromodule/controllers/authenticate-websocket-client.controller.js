export default function authenticateWebsocketClient({ application, infrastructure }) {
	return async ({ socket, request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				token: {
					type: 'string',
					optional: false,
				},
			};
			await infrastructure.validator.validate({ toValidate: request.params, schema });

			const resolveTokenResponse = await application.authenticationApi.resolveToken({
				params: {
					token: request.params.token,
				},
			});
			const user = resolveTokenResponse.payload;
			if (resolveTokenResponse.status !== 'success') return resolveTokenResponse;
			const connectedSocket = socket;
			connectedSocket.user = user;
			const joinMethods = [];
			user.roles.forEach((role) => {
				joinMethods.push(socket.joinRoom({ room: role }));
			});
			await Promise.all(joinMethods);
			await socket.joinRoom({ room: user.id });
			const response = {
				status: 'success',
				timestamp: new Date(),
				payload: {},
			};
			return response;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				module: 'websocket-api',
				source: {
					service: 'authentication',
					layer: {
						name: 'websocket-api',
						type: 'interface',
					},
					method: {
						name: 'authenticateWebsocketClient',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}

export default function signIn({ application, infrastructure }) {
	return async ({ socket, request }) => {
		try {
			const schema = {
				$$strict: 'remove',
				username: {
					type: 'string',
					optional: false,
				},
				password: {
					type: 'string',
					optional: false,
				},
			};
			await infrastructure.validator.validate({ toValidate: request.params, schema });

			const getTokenAndUserDetailsResponse = await application.authenticationApi.signIn({
				params: {
					username: request.params.username,
					password: request.params.password,
				},
			});
			if (getTokenAndUserDetailsResponse.status !== 'success')
				return getTokenAndUserDetailsResponse;
			const { user, token } = getTokenAndUserDetailsResponse.payload;
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
				payload: {
					token,
				},
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
						name: 'signIn',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}

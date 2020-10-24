export default function authenticate({ infrastructure, application }) {
	return async ({ socket, request, next }) => {
		try {
			if (socket.user) {
				next();
			} else if (request.token && !socket.user) {
				const resolveTokenResponse = await application.authenticationApi.resolveToken({
					params: {
						token: request.token,
					},
				});
				if (resolveTokenResponse.status !== 'success')
					next(new Error('An error occured while resolving token'));
				const user = resolveTokenResponse.payload;
				const connectedSocket = socket;
				connectedSocket.user = {
					id: user.id,
					roles: user.roles,
					approved: user.approved,
					emailActivated: user.emailActivated,
					active: user.active,
				};
				user.roles.forEach((role) => {
					socket.join(role);
				});
				socket.join(user.id);
				next();
			} else {
				next(new Error('Unauthorized'));
			}
			return true;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'websocket-api',
					module: 'main',
					layer: {
						name: 'websocket-api',
						type: 'interface',
					},
					method: {
						name: 'authenticate',
						type: 'middleware',
					},
				},
			});
			return next(new Error(error.message));
		}
	};
}

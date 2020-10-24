export default function getTokenAndUser({ infrastructure, domain }) {
	return async ({ params }) => {
		try {
			const Repository = domain.main.entities.user.repository;
			const user = await Repository.getUserByUsername({
				username: params.username,
				database: infrastructure.database,
			});
			if (!user) throw new Error('User does not exist');
			const comparisonResult = await infrastructure.auth.comparePasswords({
				password: params.password,
				compareTo: user.password,
			});
			if (!comparisonResult) throw new Error('Invalid password');
			delete user.password;
			const token = await infrastructure.auth.generateJwt({
				payload: user,
				expiresIn: '7d',
			});
			const response = { token, user };
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
						name: 'getTokenAndUser',
						type: 'use-case',
					},
				},
			});
			return error;
		}
	};
}

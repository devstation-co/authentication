export default function signIn({ application }) {
	return async (req, res) => {
		const { username, password } = req.body;
		const response = await application.authenticationApi.getToken({
			params: { username, password },
		});
		return res.send(response);
	};
}

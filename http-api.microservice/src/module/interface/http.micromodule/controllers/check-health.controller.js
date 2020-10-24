export default function health() {
	return async (req, res) => {
		const response = {
			status: 'success',
			timestamp: new Date(),
			payload: {
				health: 'ok',
			},
		};
		return res.send(response);
	};
}

export default function example({ application, infrastructure }) {
	return async (cmd) => {
		await infrastructure.validator.validate(cmd);
		await application.useCases.helloWorld(cmd.params);
		return true;
	};
}

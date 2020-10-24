export default function developerPrimaryEmailAddressUpdated({ infrastructure, application }) {
	return async ({ event }) => {
		try {
			await application.eventsApi.developerPrimaryEmailAddressUpdated({
				params: { event },
			});
			infrastructure.websocketEmitter.emit({
				event,
				to: event.meta.userId,
			});
			return true;
		} catch (error) {
			infrastructure.logger.error({
				message: error.message,
				source: {
					service: 'human-resources',
					module: 'projection',
					layer: {
						name: 'events-api',
						type: 'interface',
					},
					method: {
						name: 'developerPrimaryEmailAddressUpdated',
						type: 'controller',
					},
				},
			});
			return error;
		}
	};
}

import Base from '@devstation-co/events-api.interface.micromodule';
import events from './events';
import controllers from './controllers';

export default class EventsApi extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: process.env.MICROSERVICE_NAME,
			application,
			infrastructure,
			events,
			controllers,
		});
	}
}

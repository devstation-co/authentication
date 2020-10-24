import Base from '@clean-framework/events-interface';
import events from './events';
import controllers from './controllers';

export default class Events extends Base {
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

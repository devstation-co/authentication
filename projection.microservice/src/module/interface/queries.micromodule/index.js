import Base from '@clean-framework/queries-interface';
import queries from './queries';
import controllers from './controllers';

export default class Queries extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: process.env.MICROSERVICE_NAME,
			queries,
			controllers,
			application,
			infrastructure,
		});
	}
}

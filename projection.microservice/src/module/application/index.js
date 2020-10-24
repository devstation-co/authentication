import Base from '@clean-framework/application';
import Queries from './queries.micromodule';
import Events from './events.micromodule';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'queries',
					application: Queries,
				},
				{
					name: 'events',
					application: Events,
				},
			],
		});
	}
}

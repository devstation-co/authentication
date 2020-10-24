import Base from '@clean-framework/interface';
import Queries from './queries.micromodule';
import Events from './events.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
				{
					name: 'queries',
					settings: {
						application,
						infrastructure,
					},
					interface: Queries,
				},
				{
					name: 'events',
					settings: {
						application,
						infrastructure,
					},
					interface: Events,
				},
			],
		});
	}
}

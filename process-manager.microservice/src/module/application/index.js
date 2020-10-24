import Base from '@clean-framework/application';
import Events from './events.micromodule';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'events',
					application: Events,
				},
			],
		});
	}
}

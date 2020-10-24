import Base from '@clean-framework/interface';
import Events from './events.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
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

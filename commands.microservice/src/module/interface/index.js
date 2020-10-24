import Base from '@clean-framework/interface';
import Commands from './commands.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
				{
					name: 'commands',
					settings: {
						application,
						infrastructure,
					},
					interface: Commands,
				},
			],
		});
	}
}

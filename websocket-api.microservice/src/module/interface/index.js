import Base from '@clean-framework/interface';
import Websocket from './websocket.micromodule';

export default class Interface extends Base {
	constructor({ infrastructure, application }) {
		super({
			interfaces: [
				{
					name: 'websocket',
					settings: {
						infrastructure,
						application,
					},
					interface: Websocket,
				},
			],
		});
	}
}

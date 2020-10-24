import Base from '@clean-framework/interface';
import Http from './http.micromodule';

export default class Interface extends Base {
	constructor({ application, infrastructure }) {
		super({
			interfaces: [
				{
					name: 'http',
					settings: {
						application,
						infrastructure,
					},
					interface: Http,
				},
			],
		});
	}
}

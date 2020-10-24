import Base from '@clean-framework/application';
import Main from './main.micromodule';

export default class Application extends Base {
	constructor({ infrastructure, domain }) {
		super({
			infrastructure,
			domain,
			applications: [
				{
					name: 'main',
					application: Main,
				},
			],
		});
	}
}

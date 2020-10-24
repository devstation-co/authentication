import Base from '@clean-framework/domain';
import mainDomain from './main.micromodule';

export default class Domain extends Base {
	constructor() {
		super({
			domains: [
				{
					name: 'main',
					domain: mainDomain,
				},
			],
		});
	}
}

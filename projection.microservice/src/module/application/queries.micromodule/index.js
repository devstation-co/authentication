import Base from '@clean-framework/application-micromodule';
import useCases from './use-cases';

export default class Queries extends Base {
	constructor({ infrastructure, domain }) {
		super({
			settings: { infrastructure, domain },
			useCases,
		});
	}
}

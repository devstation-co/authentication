import Base from '@clean-framework/module';
import Infrastructure from './infrastructure';
import Application from './application';
import Interface from './interface';

export default class Module extends Base {
	constructor({ infrastructure }) {
		super({
			settings: {
				infrastructure,
			},
			layers: {
				Infrastructure,
				Application,
				Interface,
			},
		});
	}
}

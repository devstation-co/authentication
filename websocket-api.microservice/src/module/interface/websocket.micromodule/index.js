import Base from '@clean-framework/websocket-interface';
import middlewares from './middlewares';
import requests from './requests';
import controllers from './controllers';

export default class WebsocketInterface extends Base {
	constructor({ infrastructure, application }) {
		super({
			infrastructure,
			application,
			controllers,
			requests,
			middlewares,
			micromodules: [],
		});
	}
}

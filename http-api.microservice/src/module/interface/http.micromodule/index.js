import Base from '@clean-framework/http-interface';
import routes from './routes';
import controllers from './controllers';
import middlewares from './middlewares';

export default class HttpApi extends Base {
	constructor({ application, infrastructure }) {
		super({
			namespace: process.env.MICROSERVICE_NAME,
			routes,
			controllers,
			middlewares,
			application,
			infrastructure,
		});
	}
}

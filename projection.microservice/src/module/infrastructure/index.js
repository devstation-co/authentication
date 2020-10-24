import Base from '@clean-framework/infrastructure';
import CommandBus from '@devstation.co/command-bus.infrastructure.micromodule';
import EventBus from '@devstation.co/event-bus.infrastructure.micromodule';
import WebsocketEmitter from '@devstation.co/websocket-emitter.infrastructure.micromodule';
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import Logger from '@devstation.co/logger.infrastructure.micromodule';
import Mongodb from '@devstation.co/mongodb.infrastructure.micromodule';
import Database from '@devstation.co/database.infrastructure.micromodule';
import Auth from '@devstation.co/auth.infrastructure.micromodule';

export default class Infrastructure extends Base {
	constructor({
		commandBus,
		websocketEmitter,
		eventBus,
		validator,
		logger,
		mongodb,
		database,
		auth,
	}) {
		super({
			micromodules: [
				{
					name: 'commandBus',
					settings: commandBus,
					micromodule: CommandBus,
				},
				{
					name: 'eventBus',
					settings: eventBus,
					micromodule: EventBus,
				},
				{
					name: 'websocketEmitter',
					settings: websocketEmitter,
					micromodule: WebsocketEmitter,
				},
				{
					name: 'validator',
					settings: validator,
					micromodule: Validator,
				},
				{
					name: 'logger',
					settings: logger,
					micromodule: Logger,
				},
				{
					name: 'mongodb',
					settings: mongodb,
					micromodule: Mongodb,
				},
				{
					name: 'database',
					settings: database,
					micromodule: Database,
				},
				{
					name: 'auth',
					settings: auth,
					micromodule: Auth,
				},
			],
		});
	}
}

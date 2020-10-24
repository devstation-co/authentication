import Base from '@clean-framework/infrastructure';
import Validator from '@devstation.co/validator.infrastructure.micromodule';
import WebsocketServer from '@devstation.co/websocket-server.infrastructure.micromodule';
import CommandBus from '@devstation.co/command-bus.infrastructure.micromodule';
import Logger from '@devstation.co/logger.infrastructure.micromodule';
import HttpApiClient from '@devstation.co/http-api-client.infrastructure.micromodule';
import Idempotency from '@devstation.co/idempotency.infrastructure.micromodule';

export default class Infrastructure extends Base {
	constructor({ websocketServer, logger, commandBus, validator, httpApiClient, idempotency }) {
		super({
			micromodules: [
				{
					name: 'websocketServer',
					settings: websocketServer,
					micromodule: WebsocketServer,
				},
				{
					name: 'validator',
					settings: validator,
					micromodule: Validator,
				},
				{
					name: 'commandBus',
					settings: commandBus,
					micromodule: CommandBus,
				},
				{
					name: 'logger',
					settings: logger,
					micromodule: Logger,
				},
				{
					name: 'httpApiClient',
					settings: httpApiClient,
					micromodule: HttpApiClient,
				},
				{
					name: 'idempotency',
					settings: idempotency,
					micromodule: Idempotency,
				},
			],
		});
	}
}

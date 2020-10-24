import authenticate from './authenticate.middleware';

export default {
	requestMiddlewares: { authenticate },
};

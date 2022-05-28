import { Router } from 'express';

import { UserRoute } from './users/user.route';

const IndexRoute = Router();

IndexRoute.use('/users', UserRoute);

export { IndexRoute };

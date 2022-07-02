import { Router } from 'express';

import { SwaggerRoute } from './api-docs';
import { AuthRoute } from './auth';
import { UserRoute } from './users';

const IndexRoute = Router();

IndexRoute.use('/api-docs', SwaggerRoute);
IndexRoute.use('/auth', AuthRoute);
IndexRoute.use('/users', UserRoute);

IndexRoute.get('/', (req, res) => {
  return res.status(200).send({ success: true }).end();
});

export { IndexRoute };

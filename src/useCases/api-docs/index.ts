import { Router } from 'express';
import { resolve } from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { rootDir } from '#/config';

const pathSwagger = resolve(rootDir, 'src', 'useCases', 'swagger.yaml');
const swaggerDocument = YAML.load(pathSwagger);

const SwaggerRoute = Router();

SwaggerRoute.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { SwaggerRoute };

import { join } from 'path';

import { rootDir } from './env';
export const pathVolume = join(rootDir, 'volumes');
export const pathStatic = join(pathVolume, 'assets');
export const routeStatic = '/assets';

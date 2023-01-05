import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { IS_PRODUCTION } from '@core/env.token';

export const noProductionGuard: CanMatchFn = () => !inject(IS_PRODUCTION);

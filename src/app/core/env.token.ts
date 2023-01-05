import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
export const IS_PRODUCTION = new InjectionToken<boolean>('IS_PRODUCTION');

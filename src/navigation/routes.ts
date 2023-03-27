import type { ParamListBase } from '@react-navigation/native';

import type { IBAN } from '@src/types';

export enum Routes {
  Home = 'home',
  AddNew = 'add-new',
  Edit = 'edit',
  View = 'view',
  Privacy = 'privacy',
  NotFound = 'not-found',
}

export interface RouteParamList extends ParamListBase {
  [Routes.Home]: undefined;
  [Routes.AddNew]: undefined;
  [Routes.Edit]: { id: string };
  [Routes.View]: Partial<IBAN> & Required<Pick<IBAN, 'iban'>>;
  [Routes.Privacy]: undefined;
  [Routes.NotFound]: undefined;
}

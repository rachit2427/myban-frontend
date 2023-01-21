import type { ParamListBase } from '@react-navigation/native';

import type { IBAN } from '@src/types';

export enum Routes {
  Home = 'Home',
  AddNew = 'AddNew',
  Edit = 'Edit',
  View = 'View',
}

export interface RouteParamList extends ParamListBase {
  [Routes.Home]: undefined;
  [Routes.AddNew]: undefined;
  [Routes.Edit]: { id: string };
  [Routes.View]: Partial<IBAN> & Required<Pick<IBAN, 'iban'>>;
}

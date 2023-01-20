import type { ParamListBase } from '@react-navigation/native';

export enum Routes {
  Home = 'Home',
  AddNew = 'AddNew',
}

export interface RouteParamList extends ParamListBase {
  [Routes.Home]: undefined;
  [Routes.AddNew]: undefined;
}

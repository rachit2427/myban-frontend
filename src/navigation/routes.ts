import type { ParamListBase } from '@react-navigation/native';

export enum Routes {
  Home = 'Home',
}

export interface RouteParamList extends ParamListBase {
  [Routes.Home]: undefined;
}

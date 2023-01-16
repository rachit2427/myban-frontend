import type { ParamListBase } from '@react-navigation/native';

export interface RouteParamList extends ParamListBase {
  Home: undefined;
}

export const Routes: { [Key in keyof RouteParamList]: string } = {
  Home: 'Home',
};

export type Routes = typeof Routes;

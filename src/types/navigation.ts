import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RouteParamList } from '@src/navigation/routes';

export type NavigationProps<Route extends keyof RouteParamList> =
  NativeStackNavigationProp<RouteParamList, Route>;

export type RouteProps<Route extends keyof RouteParamList> = RouteProp<
  RouteParamList,
  Route
>;

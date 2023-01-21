import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RouteParamList } from '@src/navigation/routes';

export type NavigationProps<
  Route extends keyof RouteParamList = keyof RouteParamList,
> = NativeStackNavigationProp<RouteParamList, Route>;

export type RouteProps<Route extends keyof RouteParamList> = RouteProp<
  RouteParamList,
  Route
>;

export const useAppNavigation = <
  Route extends keyof RouteParamList = keyof RouteParamList,
>() => useNavigation<NavigationProps<Route>>();

export const useAppRoute = <Route extends keyof RouteParamList>() =>
  useRoute<RouteProps<Route>>();

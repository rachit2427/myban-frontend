import { Platform } from 'react-native';

import { APP_SCHEME, BASE_URL } from '@env';
import type {
  LinkingOptions,
  PartialRoute,
  Route,
} from '@react-navigation/native';
import { getStateFromPath } from '@react-navigation/native';

import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';

export const linkingConfig: LinkingOptions<RouteParamList> = {
  prefixes: [APP_SCHEME, BASE_URL],
  config: {
    initialRouteName: Platform.OS === 'web' ? undefined : Routes.Home,
    screens: {
      [Routes.View]: Routes.View,
      [Routes.Privacy]: Routes.Privacy,
      [Routes.NotFound]: '*',
    },
  },
  getStateFromPath: (path, options) => {
    let state = getStateFromPath(path, options);

    state = {
      ...state,
      routes:
        state?.routes.map(route =>
          route.name === Routes.View ? mapViewParams(route) : route,
        ) || [],
    };

    return state;
  },
};

type Param = Record<string, unknown> | undefined;

const mapViewParams = (
  route: PartialRoute<Route<string, object | undefined>>,
) => ({
  ...route,
  params: {
    iban: (route.params as Param | undefined)?.i,
    firstname: (route.params as Param | undefined)?.fn,
    lastname: (route.params as Param | undefined)?.ln,
  },
});

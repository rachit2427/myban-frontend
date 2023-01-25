import { BASE_URL } from '@env';
import type {
  LinkingOptions,
  PartialRoute,
  Route,
} from '@react-navigation/native';
import { getStateFromPath } from '@react-navigation/native';

import type { RouteParamList } from '@src/navigation/routes';
import { Routes } from '@src/navigation/routes';

const config = Object.fromEntries(
  Object.entries(Routes).map(([key, val]) => {
    return [key, val.toLowerCase()];
  }),
);

export const linkingConfig: LinkingOptions<RouteParamList> = {
  prefixes: [BASE_URL],
  config: {
    screens: config,
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

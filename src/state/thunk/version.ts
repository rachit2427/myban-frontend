import { Platform } from 'react-native';

import semver from 'semver';
import { createAsyncThunk } from '@reduxjs/toolkit';

import packageJSON from '@root/package.json';
import { fetchVersion } from '@src/api/version';
import {
  setShouldHardPushVersion,
  setShouldSoftPushVersion,
} from '@src/state/slices/app';

export const compareVersion = createAsyncThunk(
  '@THUNK/COMPARE_VERSION',
  async (_, thunkApi) => {
    const currentVersion = packageJSON.version;

    const versions = await fetchVersion();
    const version = versions[Platform.OS];

    if (!version) return;

    if (semver.lt(currentVersion, version.hard)) {
      thunkApi.dispatch(setShouldHardPushVersion(true));
      return;
    }

    if (semver.lt(currentVersion, version.soft)) {
      thunkApi.dispatch(setShouldSoftPushVersion(true));
      return;
    }

    return;
  },
);

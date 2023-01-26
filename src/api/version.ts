import { Platform } from 'react-native';

import { BASE_URL } from '@env';

type Version = { soft: string; hard: string };
type VersionResponse = Partial<Record<Platform['OS'], Version>>;

export const fetchVersion = async () => {
  if (Platform.OS === 'web') return {};

  const response = await fetch(`${BASE_URL}/version`);
  const versions: VersionResponse = await response.json();

  return versions;
};

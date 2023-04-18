import React, { memo, useCallback } from 'react';
import { Alert, Linking, Pressable } from 'react-native';

import { GITHUB_LINK } from '@env';

import { Box } from '@src/components/Layout/Box';
import { Text } from '@src/components/Text';
import { useTheme } from '@src/hooks/useTheme';
import { Spacing } from '@src/utils/Spacing';

interface GithubProps {}

const GithubComponent: React.FC<GithubProps> = ({}) => {
  const { colors: themeColors } = useTheme();

  const onPress = useCallback(() => {
    try {
      Linking.openURL(GITHUB_LINK);
    } catch {
      Alert.alert(
        'Could not open the Github link. :(\nMaybe like the app on the store?',
      );
    }
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Box
        justify="center"
        align="center"
        bg={themeColors.yellow600}
        pv={Spacing.medium}
        radius={4}
      >
        <Text>View on GitHub</Text>
      </Box>
    </Pressable>
  );
};

export const Github = memo(GithubComponent);

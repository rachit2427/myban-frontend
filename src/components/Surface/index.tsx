import type { PropsWithChildren } from 'react';
import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native/types';
import type { ShadowProps } from 'react-native-shadow-2';
import { Shadow } from 'react-native-shadow-2';

interface Sides {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
}

export interface SurfaceProps {
  stretch?: boolean;
  distance?: number;
  sides?: Partial<Sides>;
  offset?: ShadowProps['offset'];
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const defaultSides: Sides = {
  left: true,
  right: true,
  top: true,
  bottom: true,
};

const SurfaceComponent: React.FC<PropsWithChildren<SurfaceProps>> = ({
  stretch = true,
  distance = 2,
  sides: sidesProp,
  style: styleProp,
  color,
  ...props
}) => {
  const sides = useMemo<Sides>(
    () => ({
      left: sidesProp?.left || defaultSides.left,
      right: sidesProp?.right || defaultSides.right,
      top: sidesProp?.top || defaultSides.top,
      bottom: sidesProp?.bottom || defaultSides.bottom,
    }),
    [sidesProp?.bottom, sidesProp?.left, sidesProp?.right, sidesProp?.top],
  );

  const style = StyleSheet.flatten([
    stretch ? styles.fullWidth : null,
    styleProp,
  ]);

  return (
    <Shadow
      stretch={stretch}
      distance={distance}
      startColor={color}
      endColor={color}
      sides={{
        start: sides.left,
        end: sides.right,
        top: sides.top,
        bottom: sides.bottom,
      }}
      corners={{
        topStart: sides.left && sides.top,
        topEnd: sides.top && sides.right,
        bottomStart: sides.bottom && sides.left,
        bottomEnd: sides.right && sides.bottom,
      }}
      style={style}
      {...props}
    />
  );
};

export const Surface = memo(SurfaceComponent);

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
});

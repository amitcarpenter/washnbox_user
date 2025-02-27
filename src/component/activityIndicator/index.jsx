import React from 'react';
import { StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native';
import { hp, wp } from '../../config';
import { COLORS } from '../../constant/constant';

type ActivityIndicterProps = {
  show: boolean;
  style?: ViewStyle;
  color?: string;
};

const ActivityIndicter: React.FC<ActivityIndicterProps> = ({ show, style, color }) => {
  return (
    <View style={[styles.activityIndicator, style]}>
      <ActivityIndicator animating={show} size="large" color={color || COLORS.white} />
    </View>
  );
};

export default ActivityIndicter;

const styles = StyleSheet.create({
  activityIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    justifyContent: 'center',
    height: hp(100),
    width: wp(100),
  },
});

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  TextProps,
  ViewProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constant/constant';

type Props = {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  keyboardType: 'phone-pad' | 'email-address';
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (value: string) => void;
  value?: string;
  editable?: boolean;
};
const Input = (props: Props) => {
  return (
    <View style={[props.containerStyle]}>
      <Text style={[styles.labelStyle, props.labelStyle]}>
        {props.label || 'Enter label here'}
      </Text>

      <TextInput
        editable={props.editable}
        value={props.value}
        placeholderTextColor={COLORS.borderColor}
        placeholder={props.placeholder || '+91'}
        style={[styles.inputFieldStyle, props.inputStyle]}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: 16,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  labelStyle: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 16,
    fontWeight: '600',
  },
});

export default Input;

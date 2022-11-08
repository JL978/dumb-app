import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Text, useThemeColor } from './Themed';

const Button = ({
  children,
  onPress,
  style = {},
}: {
  children: React.ReactNode | string;
  onPress: () => void;
  style?: TouchableOpacityProps['style'];
}) => {
  const color = useThemeColor({}, 'primary');

  const content =
    typeof children === 'string' ? (
      <Text style={[styles.buttonText]}>{children}</Text>
    ) : (
      children
    );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }, style]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 1000,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default Button;

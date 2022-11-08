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
  children: string;
  onPress: () => void;
  style?: TouchableOpacityProps['style'];
}) => {
  const color = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }, style]}>
      <Text style={[styles.buttonText]}>{children}</Text>
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
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default Button;

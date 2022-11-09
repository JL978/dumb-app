import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  TouchableOpacityProps,
  ScrollView,
} from 'react-native';

import { Text, useThemeColor, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { useReducer } from 'react';
import usePizzas from './usePizzas';
import cuid from 'cuid';
import { AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
} & TextInputProps;

const Input = ({ label, value, onChangeText, ...props }: InputProps) => {
  const inputBackgroundColor = useThemeColor({}, 'inputBackground');
  const textColor = useThemeColor({}, 'text');
  const inputLabelColor = useThemeColor({}, 'inputLabelColor');

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: inputLabelColor }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: inputBackgroundColor, color: textColor },
        ]}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const initialFormValues = {
  name: '',
  size: '',
  amount: '',
  price: '',
};

type Action = {
  type: 'UPDATE_VALUE';
  field: keyof typeof initialFormValues;
  value: string;
};

const formReducer = (state: typeof initialFormValues, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<'Modal'>) {
  const textColor = useThemeColor({}, 'text');
  const { addPizza } = usePizzas();
  const [formValues, dispatchFormValues] = useReducer(
    formReducer,
    initialFormValues
  );

  const onClose = () => {
    navigation.goBack();
  };
  const onAdd = () => {
    const newPizza = {
      name: formValues.name || 'Pizza',
      size: Number(formValues.size) || 10,
      amount: Number(formValues.amount) || 1,
      price: Number(formValues.price) || 10,
      id: cuid(),
    };
    addPizza(newPizza);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Yo Pizza</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <Input
          label="Name"
          value={formValues.name}
          onChangeText={(text) =>
            dispatchFormValues({
              type: 'UPDATE_VALUE',
              field: 'name',
              value: text,
            })
          }
        />
        <Input
          label="Diameter (in)"
          value={formValues.size}
          onChangeText={(text) =>
            dispatchFormValues({
              type: 'UPDATE_VALUE',
              field: 'size',
              value: text,
            })
          }
          keyboardType="numeric"
        />
        <Input
          label="Amount"
          value={formValues.amount}
          onChangeText={(text) =>
            dispatchFormValues({
              type: 'UPDATE_VALUE',
              field: 'amount',
              value: text,
            })
          }
          keyboardType="numeric"
        />
        <Input
          label="Deal Price ($)"
          value={formValues.price}
          onChangeText={(text) =>
            dispatchFormValues({
              type: 'UPDATE_VALUE',
              field: 'price',
              value: text,
            })
          }
          keyboardType="numeric"
        />
        <Button onPress={onAdd} style={{ width: '60%' }}>
          Add
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 75,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '55%',
    height: 40,
    backgroundColor: '#D7DFE2',
    borderRadius: 1000,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF4500',
    borderRadius: 1000,
    width: '60%',
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

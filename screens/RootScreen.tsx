import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabScreenProps,
} from '../types';
import usePizzas from './usePizzas';

export default function RootScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const { pizzas, removePizza } = usePizzas();
  const openModal = () => {
    navigation.navigate('Modal');
  };

  if (pizzas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You got no pizza, dawg</Text>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {pizzas.map((pizza) => (
          <View key={pizza.id} style={styles.pizzaContainer}>
            <TouchableOpacity onPress={() => removePizza(pizza.id)}>
              <Text>Remove</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{pizza.name}</Text>

            <Text style={styles.pizzaInfoText}>Price/Area{pizza.price}</Text>

            <View style={styles.pizzaInfoContainer}>
              <Text style={styles.pizzaInfoText}>Price: {pizza.price}</Text>
              <Text style={styles.pizzaInfoText}>Area: {pizza.size}</Text>
              <Text style={styles.pizzaInfoText}>Amount: {pizza.amount}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FF4500',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: 'red',
    width: '25%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  pizzaContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 22,

    elevation: 5,
  },
  pizzaInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  pizzaInfoText: {
    fontSize: 12,
  },
});

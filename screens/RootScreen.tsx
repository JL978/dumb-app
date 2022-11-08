import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, useThemeColor, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import usePizzas, { Pizza } from './usePizzas';
import CurrencyFormat from 'react-currency-format';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

function processPizzas(pizzas: Pizza[]) {
  return pizzas
    .map((pizza) => {
      const area = (pizza.size / 2) ** 2 * Math.PI;
      return {
        ...pizza,
        area,
        priceEff: pizza.price / (area * pizza.amount),
      };
    })
    .sort((a, b) => a.priceEff - b.priceEff);
}

export default function RootScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const textColor = useThemeColor({}, 'text');
  const { pizzas, removePizza } = usePizzas();

  const processedPizzas = useMemo(() => processPizzas(pizzas), [pizzas]);

  const openModal = () => {
    navigation.navigate('Modal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="pizza" size={50} color={textColor} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Dumb Reddit</Text>
          <Text style={styles.title}>Pizza Efficiency App</Text>
        </View>
      </View>
      {processedPizzas?.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.title}>You got no pizza, dawg</Text>
          <Button onPress={openModal}>Add</Button>
        </View>
      ) : (
        <View style={styles.nonEmptyStateContainer}>
          {processedPizzas?.map((pizza, index) => (
            <View key={pizza.id} style={styles.pizzaContainer}>
              {index === 0 && (
                <View style={styles.bestPizza}>
                  <Text style={styles.bestPizzaText}>Cheapest Pizza Deal!</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => removePizza(pizza.id)}>
                <AntDesign name="close" size={14} color="#404040" />
              </TouchableOpacity>
              <Text style={styles.pizzaTitle}>{pizza.name}</Text>

              <Text style={[styles.pizzaInfoText, { fontSize: 14 }]}>
                Price Efficiency:{' '}
                <CurrencyFormat
                  value={pizza.priceEff}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <Text style={{ fontWeight: 'bold' }}>{value}</Text>
                  )}
                  suffix={' / in²'}
                />
              </Text>

              <View style={styles.pizzaInfoContainer}>
                <Text style={styles.pizzaInfoText}>
                  Price:{' '}
                  <CurrencyFormat
                    value={pizza.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                </Text>
                <Text style={styles.pizzaInfoText}>
                  Area: {pizza.area.toFixed(1)} in²
                </Text>
                <Text style={styles.pizzaInfoText}>Amount: {pizza.amount}</Text>
              </View>
            </View>
          ))}
          <Button onPress={openModal} style={styles.button}>
            <FontAwesome name="plus" size={22} color="white" />
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  nonEmptyStateContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#D7DFE2',
    borderRadius: 1000,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: 'absolute',
    bottom: 50,
  },
  container: {
    flex: 1,
  },
  pizzaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  pizzaContainer: {
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
    overflow: 'hidden',
  },
  pizzaInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  pizzaInfoText: {
    fontSize: 12,
    marginTop: 10,
  },
  bestPizza: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF4500',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderBottomRightRadius: 10,
  },
  bestPizzaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

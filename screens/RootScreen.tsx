import { useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

import { Text, useThemeColor, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import usePizzas, { Pizza } from './usePizzas';
import CurrencyFormat from 'react-currency-format';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import Button from '../components/Button';

function processPizzas(pizzas: Pizza[]) {
  return pizzas
    .map((pizza) => {
      const area = (pizza.size / 2) ** 2 * Math.PI * pizza.amount;
      return {
        ...pizza,
        area,
        priceEff: pizza.price / area,
      };
    })
    .sort((a, b) => a.priceEff - b.priceEff);
}

const PizzaTile = ({ pizza, isBest }: { pizza: any; isBest?: boolean }) => {
  const { removePizza } = usePizzas();

  const deleteButtonColor = useThemeColor(
    { dark: '#b0b0b0', light: '#D7DFE2' },
    'text'
  );
  const tileBackgroundColor = useThemeColor({}, 'tileBackground');
  return (
    <View
      key={pizza.id}
      style={[styles.pizzaContainer, { backgroundColor: tileBackgroundColor }]}>
      {isBest && (
        <View style={styles.bestPizza}>
          <Text style={styles.bestPizzaText}>Cheapest Pizza Deal!</Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: deleteButtonColor }]}
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
          Total Area: {pizza.area.toFixed(1)} in²
        </Text>
        <Text style={styles.pizzaInfoText}>Amount: {pizza.amount}</Text>
      </View>
    </View>
  );
};

export default function RootScreen({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const deleteButtonColor = useThemeColor(
    { dark: '#b0b0b0', light: '#D7DFE2' },
    'text'
  );
  const primaryColor = useThemeColor({}, 'primary');
  const disabledTextColor = useThemeColor({}, 'textDisabled');
  const tileBackgroundColor = useThemeColor({}, 'tileBackground');

  const { pizzas } = usePizzas();

  const processedPizzas = useMemo(() => processPizzas(pizzas), [pizzas]);

  const openModal = () => {
    navigation.navigate('Modal');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <View style={[styles.icon, { backgroundColor: primaryColor }]}>
          <Ionicons
            name="pizza"
            style={{ marginTop: 3 }}
            size={40}
            color={'white'}
          />
        </View> */}
        <Image
          source={require('../assets/images/app-icon.png')}
          style={{ width: 45, height: 45 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Dumb Reddit</Text>
          <Text style={styles.title}>Pizza App</Text>
        </View>
      </View>
      {processedPizzas?.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <FontAwesome5
            name="pizza-slice"
            style={{ marginBottom: 30, marginTop: 130 }}
            size={80}
            color={disabledTextColor}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: disabledTextColor,
            }}>
            You got no pizza, dawg
          </Text>
          <Button onPress={openModal}>Add</Button>
        </View>
      ) : (
        <View style={styles.nonEmptyStateContainer}>
          <FlatList
            data={processedPizzas}
            renderItem={({ item, index }) => (
              <PizzaTile pizza={item} isBest={index === 0} />
            )}
            keyExtractor={(item) => item.id}
          />
          {/* {processedPizzas?.map((pizza, index) => (
            <PizzaTile pizza={pizza} isBest={index === 0} />
          ))} */}
          <Button onPress={openModal} style={styles.button}>
            <FontAwesome
              name="plus"
              style={{ marginTop: 2 }}
              size={26}
              color="white"
            />
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
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
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 1000,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 60,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: 'absolute',
    bottom: 30,
  },
  container: {
    flex: 1,
  },
  pizzaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
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
    backgroundColor: 'transparent',
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

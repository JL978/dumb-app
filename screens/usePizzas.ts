import useAsyncStorage from '../hooks/useAsyncStorage';

export type Pizza = {
  id: string;
  name: string;
  size: number;
  amount: number;
  price: number;
};

export default function usePizzas() {
  const { data, isLoading, setValue } = useAsyncStorage<Pizza[]>('pizzas', []);

  const addPizza = (pizza: Pizza) => {
    setValue((pizzas) => [...pizzas, pizza]);
  };

  const removePizza = (id: string) => {
    setValue((pizzas) => pizzas.filter((pizza) => pizza.id !== id));
  };

  return { pizzas: data, addPizza, removePizza };
}

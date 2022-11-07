import useAsyncStorage from '../hooks/useAsyncStorage';

export type Pizza = {
  id: string;
  name: string;
  size: number;
  amount: number;
  price: number;
};

export default function usePizzas() {
  const [pizzas, setPizzas] = useAsyncStorage<Pizza[]>('pizzas', []);

  const addPizza = (pizza: Pizza) => {
    setPizzas((pizzas) => [...pizzas, pizza]);
  };

  const removePizza = (id: string) => {
    setPizzas((pizzas) => pizzas.filter((pizza) => pizza.id !== id));
  };

  return { pizzas, addPizza, removePizza };
}

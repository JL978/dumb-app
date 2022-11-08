import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function useAsyncStorage<T>(key: string, initialValue: T) {
  async function getStoredItem(key: string, initialValue: T) {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  }

  const query = useQuery<T, Error>({
    queryKey: [key],
    queryFn: () => getStoredItem(key, initialValue),
    initialData: initialValue,
  });

  const setValue = async (value: T | ((arg: T) => T)) => {
    if (value instanceof Function) {
      value = value(query.data);
    }
    await AsyncStorage.setItem(key, JSON.stringify(value));
    query.refetch();
  };

  return { ...query, setValue };
}

import { useEffect } from 'react';

export const useFetch = () => {
  console.log(123);

  useEffect(() => {
    console.debug('\nuseFetch test3333!');
  }, []);
};

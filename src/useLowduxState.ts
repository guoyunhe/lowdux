import { useEffect, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxState<T>(
  path: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState<T>();

  useEffect(() => {
    function onChange(e: Event) {
      if ((e as CustomEvent).detail === path) {
        setState(store.get(path));
      }
    }
    store.addEventListener('change', onChange);
    return () => {
      store.removeEventListener('change', onChange);
    };
  }, [path]);

  useEffect(() => {
    store.set(path, state);
  }, [state, path]);

  return [state, useState];
}

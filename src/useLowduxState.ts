import { useEffect, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxState<T>(
  path: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState<T>();

  useEffect(() => {
    function onChange(changePath: string) {
      if (changePath === path) {
        setState(store.get(path));
      }
    }
    store.on('change', onChange);
    return () => {
      store.off('change', onChange);
    };
  }, [path]);

  useEffect(() => {
    store.set(path, state);
  }, [state, path]);

  return [state, useState];
}

import { useCallback, useEffect, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxState<T>(path: string) {
  const [state, setState] = useState<T>();

  const setStateAndEmit = useCallback(
    (data: T) => {
      store.set(path, data);
    },
    [path]
  );

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

  return [state, setStateAndEmit];
}

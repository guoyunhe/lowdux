import { useEffect, useRef, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxSelector<T>(
  path: string,
  selector: (state: any) => T
) {
  const [state, setState] = useState<T>(selector(store.get(path)));
  const oldValueRef = useRef<T>(state);

  useEffect(() => {
    function update() {
      const newValue = selector(store.get(path));
      // TODO: deep compare
      if (oldValueRef.current !== newValue) {
        setState(newValue);
        oldValueRef.current = newValue;
      }
    }
    function onChange(changePath: string) {
      if (changePath === path) {
        update();
      }
    }
    update();
    store.on('change', onChange);
    return () => {
      store.off('change', onChange);
    };
  }, [path, selector]);

  return state;
}

import { useEffect, useRef, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxSelector<T>(
  path: string,
  selector: (state: any) => T = (state) => state
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
    function onChange(e: Event) {
      if ((e as CustomEvent).detail === path) {
        update();
      }
    }
    update();
    store.addEventListener('change', onChange);
    return () => {
      store.removeEventListener('change', onChange);
    };
  }, [path, selector]);

  return state;
}

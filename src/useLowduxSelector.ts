import { useEffect, useState } from 'react';
import { store } from './LowduxStore';

export function useLowduxSelector<T>(
  path: string,
  selector: (state: any) => T = (state) => state
) {
  const [state, setState] = useState<T>(selector(store.get(path)));

  useEffect(() => {
    function update() {
      const newValue = selector(store.get(path));
      setState(newValue);
    }
    function onChange(e: Event) {
      const detail = (e as CustomEvent).detail as string;
      if (
        detail === path ||
        path.startsWith(detail + '.') ||
        detail.startsWith(path + '.')
      ) {
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

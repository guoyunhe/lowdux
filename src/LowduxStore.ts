import { diff } from 'deep-object-diff';
import {
  deepKeys,
  deleteProperty,
  getProperty,
  hasProperty,
  setProperty,
} from 'dot-prop';

export class LowduxStore extends EventTarget {
  private data: Record<string, any> = {};

  /**
   * Get the store data at the given path
   * @param path dot-path of the store data
   */
  public get(path: string, defaultValue: any = null): any {
    return getProperty(this.data, path, defaultValue);
  }

  /**
   * Set the store data at the given path to the given value
   * @param path dot-path of the store data
   */
  public set(path: string, value: any): LowduxStore {
    const oldValue = this.get(path);
    setProperty(this.data, path, value);

    // record changed paths and emit change events
    const diffObj = diff(oldValue, value);
    const eventPathSet = new Set<string>();
    if (typeof diffObj === 'object') {
      const keys = deepKeys(diffObj);
      keys.forEach((key) => {
        let fullPath = path + '.' + key;
        let dotIndex = -1;
        do {
          eventPathSet.add(fullPath);
          dotIndex = fullPath.lastIndexOf('.');
          fullPath = fullPath.substring(0, dotIndex);
        } while (dotIndex > -1);
      });
    } else {
      // diff of number, string, boolean, null, undefined, etc
      this.dispatchEvent(new CustomEvent('change', { detail: path }));
      let fullPath = path;
      let dotIndex = -1;
      do {
        eventPathSet.add(fullPath);
        dotIndex = fullPath.lastIndexOf('.');
        fullPath = fullPath.substring(0, dotIndex);
      } while (dotIndex > -1);
    }

    eventPathSet.forEach((p) => {
      this.dispatchEvent(new CustomEvent('change', { detail: p }));
    });

    return this;
  }

  /**
   * Check whether the store data at the given path exists
   * @param path dot-path of the store data
   * @returns whether the store data exists
   */
  public has(path: string): boolean {
    return hasProperty(this.data, path);
  }

  /**
   * Delete store data at the given path exists
   * @param path dot-path of the store data
   * @returns whether the store data existed before being deleted
   */
  public delete(path: string): boolean {
    return deleteProperty(this.data, path);
  }
}

/**
 * The default glodal store
 */
export const store = new LowduxStore();

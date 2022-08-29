import {
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
    setProperty(this.data, path, value);
    this.dispatchEvent(new CustomEvent('change', { detail: path }));
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

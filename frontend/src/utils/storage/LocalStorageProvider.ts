import { IStorageProvider } from './IStorageProvider';
import { StorageObject } from './StorageObject';

class LocalStorageProvider implements IStorageProvider {
    set<T>(key: string, value: T) {
        const storageItem = new StorageObject(value);

        localStorage.setItem(key, storageItem.toStorageItem());
    }

    get<T>(key: string): StorageObject<T> {
        const rawValue = localStorage.getItem(key);

        return StorageObject.fromStorageItem<T>(rawValue);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

export default new LocalStorageProvider();

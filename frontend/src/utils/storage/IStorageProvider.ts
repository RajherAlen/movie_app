import { StorageObject } from './StorageObject';

export interface IStorageProvider {
    set<T>(key: string, value: T): void;
    get<T>(key: string): StorageObject<T>;
    remove(key: string): void;
    clear(): void;
}

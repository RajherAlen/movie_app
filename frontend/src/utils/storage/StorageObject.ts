export class StorageObject<T> {
    value?: T;

    constructor(value?: T) {
        this.value = value;
    }

    toStorageItem(): string {
        return JSON.stringify(this);
    }

    static fromStorageItem<T>(value?: string | null): StorageObject<T> {
        if (value == null) {
            return new StorageObject<T>();
        }

        return JSON.parse(value) as StorageObject<T>;
    }
}

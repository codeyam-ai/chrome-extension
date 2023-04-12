export class FakeStorage {
    storedValues: Record<string, unknown> = {};

    get(
        dkeys?: null | string | string[] | Record<string, unknown>
    ): Promise<Record<string, unknown>> {
        return new Promise<Record<string, unknown>>((resolve, reject) => {
            if (dkeys === null || typeof dkeys === 'undefined') {
                resolve({ ...this.storedValues });
            } else if (typeof dkeys === 'string') {
                resolve({ [dkeys]: this.storedValues[dkeys] });
            } else if (Array.isArray(dkeys)) {
                const returnVal: Record<string, unknown> = {};
                for (const dkey in dkeys) {
                    returnVal[dkey] = this.storedValues[dkey];
                }
                resolve(returnVal);
            } else if (typeof dkeys === 'object') {
                const returnVal: Record<string, unknown> = {};
                for (const dkey in dkeys) {
                    if (this.storedValues[dkey]) {
                        returnVal[dkey] = this.storedValues[dkey];
                    } else {
                        returnVal[dkey] = dkeys[dkey];
                    }
                }
                resolve(returnVal);
            }
        });
    }

    async set(items: Record<string, unknown>): Promise<void> {
        for (const property in items) {
            this.storedValues[property] = items[property];
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    async remove(key: string) {
        delete this.storedValues[key];
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    clear() {
        this.storedValues = {};
    }
}

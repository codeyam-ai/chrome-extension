export class FakeStorage {
    records: Record<string, unknown> = {};

    get(
        dkeys?: null | string | string[] | Record<string, unknown>
    ): Promise<Record<string, unknown>> {
        return new Promise<Record<string, unknown>>((resolve, reject) => {
            const returnVal: Record<string, unknown> = {};
            if (typeof dkeys === 'string') {
                returnVal[dkeys] = this.records[dkeys];
            }
            resolve(returnVal);
        });
    }

    async set(items: Record<string, unknown>): Promise<void> {
        for (const property in items) {
            this.records[property] = items[property];
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    clear() {
        this.records = {};
    }
}

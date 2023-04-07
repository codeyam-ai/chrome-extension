import { FakeEvent } from '_src/test/utils/fake-browser/fake-runtime';

import type { Alarms } from 'webextension-polyfill/namespaces/alarms';


export class FakeAlarms {
    names: string[] = [];
    create(
        name: string | undefined,
        alarmInfo: Alarms.CreateAlarmInfoType
    ): void {
        if (name) {
            this.names.push(name);
        }
    }

    onAlarm: FakeEvent<(name: Alarms.Alarm) => void> = new FakeEvent();

    clear() {
        this.names = [];
    }
}

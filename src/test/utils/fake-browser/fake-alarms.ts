import { FakeEvent } from '_src/test/utils/fake-browser/fake-runtime';

import type { Alarms } from 'webextension-polyfill/namespaces/alarms';

export class FakeAlarms {
    alarmsCreated: { name: string; alarmInfo: Alarms.CreateAlarmInfoType }[] =
        [];
    create(
        name: string | undefined,
        alarmInfo: Alarms.CreateAlarmInfoType
    ): void {
        if (name) {
            this.alarmsCreated.push({ name, alarmInfo });
        }
    }

    onAlarm: FakeEvent<(name: Alarms.Alarm) => void> = new FakeEvent();

    clear() {
        this.alarmsCreated = [];
    }
}

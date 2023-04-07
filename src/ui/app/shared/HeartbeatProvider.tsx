import { type ReactNode, useEffect } from 'react';

import { useDependencies } from '_shared/utils/dependenciesContext';
import { thunkExtras } from '_store/thunk-extras';

const HeartbeatProvider = ({ children }: { children: ReactNode }) => {
    const { heartbeat } = useDependencies();
    useEffect(() => {
        let focussed = true;
        const onBlur = () => {
            focussed = false;
        };
        const onFocus = () => {
            focussed = true;
        };
        window.addEventListener('blur', onBlur);
        window.addEventListener('focus', onFocus);
        heartbeat.onBeat(() => {
            if (focussed) {
                thunkExtras.background.sendHeartbeat();
            }
        });
    });

    return <>{children}</>;
};

export default HeartbeatProvider;

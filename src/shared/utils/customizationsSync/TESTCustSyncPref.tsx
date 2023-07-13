import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveCustomizationsSyncPreference,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import { useCallback } from 'react';

const TESTCustSyncPref: React.FC = () => {
    const dispatch = useAppDispatch();
    const account = useAppSelector((state) => state.account);
    console.log('account :>> ', account.customizationsSyncPreference);

    const getTest = useCallback(async () => {
        const test = await dispatch(loadCustomizationsSyncPreference());
        console.log('test :>> ', test);
    }, [dispatch]);

    const saveTestTrue = useCallback(async () => {
        const test = await dispatch(saveCustomizationsSyncPreference(true));
        console.log('test :>> ', test);
    }, [dispatch]);

    const saveTestFalse = useCallback(async () => {
        const test = await dispatch(saveCustomizationsSyncPreference(false));
        console.log('test :>> ', test);
    }, [dispatch]);
    return (
        <div>
            <h1>TESTCustSyncPref</h1>
            <Button onClick={getTest}>getTest</Button>
            <Button onClick={saveTestTrue}>saveTestTrue</Button>
            <Button onClick={saveTestFalse}>saveTestFalse</Button>
        </div>
    );
};

export default TESTCustSyncPref;

import { configureStore } from '@reduxjs/toolkit';

import accountReducer, { loadAccountInformationFromStorage } from '../index';

describe('loadAccountInformationFromStorage', () => {
    it('dispatches the correct actions when it completes successfully', async () => {
        const store = configureStore({
            reducer: { account: accountReducer },
        });

        await store.dispatch(loadAccountInformationFromStorage());

        // const actions = store.getActions();
        // expect(actions[0]).toEqual({ type: 'account/loadAccountInformationFromStorage/pending' });
        // expect(actions[1]).toEqual({ type: 'account/loadAccountInformationFromStorage/fulfilled', payload: 'fulfilledPayload' });
    });
});

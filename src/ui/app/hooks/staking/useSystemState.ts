import { useQuery } from '@tanstack/react-query';

import { api } from '../../redux/store/thunk-extras';

export function useSystemState() {
    const client = api.instance.client;
    return useQuery(['system', 'state'], () =>
        client.getLatestSuiSystemState()
    );
}

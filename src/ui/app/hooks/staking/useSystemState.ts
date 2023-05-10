import { useQuery } from '@tanstack/react-query';

import { api } from '../../redux/store/thunk-extras';

export function useSystemState() {
    const provider = api.instance.fullNode;
    return useQuery(['system', 'state'], () =>
        provider.getLatestSuiSystemState()
    );
}

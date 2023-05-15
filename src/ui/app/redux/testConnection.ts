import type ApiProvider from '../ApiProvider';

const testConnection = async (api: ApiProvider) => {
    const fallbackNumber = api.fallbackNumber;
    try {
        const response = await fetch(
            api.instance.fullNode.connection.fullnode,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'rpc.discover',
                }),
            }
        );

        if (response.status !== 200) {
            if (api.fallback(fallbackNumber)) {
                await testConnection(api);
                return;
            }
            throw new Error('RPC not responding');
        }
    } catch (e) {
        if (api.fallback(fallbackNumber)) {
            await testConnection(api);
            return;
        }
        throw new Error('RPC not responding');
    }
};

export default testConnection;

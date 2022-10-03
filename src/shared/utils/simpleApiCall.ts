import { BASE_URL } from '../constants';

type FetchData = {
    method: string;
    headers: Record<string, string>;
    body?: string;
};

// const accessToken = useAppSelector(({ account }) => account.authentication);

const simpleApiCall = async (
    relativePath: string,
    method = 'GET',
    accessToken: string,
    body?: string
) => {
    const data: FetchData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-Supabase-Access-Token': accessToken,
        },
    };

    if (body) {
        data.body = body;
    }

    const response = await fetch(`${BASE_URL}/api/${relativePath}`, data);
    const { status } = response;

    if (status !== 200) return { status };

    const json = await response.json();
    return { json, status };
};

export default simpleApiCall;

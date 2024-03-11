import { BASE_URL, SECURE_URL } from '_shared/constants';

type FetchData = {
    method: string;
    headers: Record<string, string>;
    body?: string;
};

type ApiCallArgs = {
    relativePath: string;
    method?: string;
    accessToken: string;
    body?: Record<string, string | number | object>;
    secure?: boolean;
};

// const accessToken = useAppSelector(({ account }) => account.authentication);

export const apiCall = async ({
    relativePath,
    method = 'GET',
    accessToken,
    body,
    secure,
}: ApiCallArgs) => {
    const data: FetchData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-Supabase-Access-Token': accessToken,
        },
    };

    if (body) {
        data.body = JSON.stringify(body);
    }

    const baseUrl = secure
        ? 'https://ethoswallet-xyz-app-2af571486ef0.relay.evervault.com'
        : BASE_URL;
    // const baseUrl = secure ? SECURE_URL : BASE_URL;
    const response = await fetch(`${baseUrl}/api/${relativePath}`, data);
    const { status } = response;

    if (status !== 200) return { status };

    const json = await response.json();
    return { json, status };
};

export const simpleApiCall = async (
    relativePath: string,
    method = 'GET',
    accessToken: string,
    body?: Record<string, string | number | object>
) => {
    return apiCall({
        relativePath,
        method,
        accessToken,
        body,
    });
};

export const secureApiCall = async (
    relativePath: string,
    method = 'GET',
    accessToken: string,
    body?: Record<string, string | number | object>
) => {
    return apiCall({
        relativePath,
        method,
        accessToken,
        body,
        secure: true,
    });
};

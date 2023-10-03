type EnvType = typeof process.env.NODE_ENV | 'test';

const ETHOS_SALT_SERVICE_STAGING_URL =
    'https://salt-service-staging-e74b300e2837.herokuapp.com';
const ETHOS_SALT_SERVICE_DEV_URL =
    'https://salt-service-dev-a49a2100f792.herokuapp.com';
const ETHOS_SALT_SERVICE_LOCAL_URL = 'http://localhost:3005';

export function getSaltServiceUrl(
    { env }: { env: EnvType } = { env: process.env.NODE_ENV }
) {
    switch (env) {
        case 'production':
            return ETHOS_SALT_SERVICE_STAGING_URL;
        case 'development':
            return ETHOS_SALT_SERVICE_DEV_URL;
        case 'test':
        default:
            return ETHOS_SALT_SERVICE_LOCAL_URL;
    }
}

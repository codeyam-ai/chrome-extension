import { getSaltServiceUrl } from './urls.saltService';

test('getSaltServiceUrl', () => {
    expect(getSaltServiceUrl({ env: 'production' })).toBe(
        'https://salt-service-dev-a49a2100f792.herokuapp.com/'
    );

    expect(getSaltServiceUrl({ env: 'development' })).toBe('http://localhost:3005');
    expect(getSaltServiceUrl({ env: 'test' })).toBe('http://localhost:3005');
    expect(getSaltServiceUrl()).toBe('http://localhost:3005');
});

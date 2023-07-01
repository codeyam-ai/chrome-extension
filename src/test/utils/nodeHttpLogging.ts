/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'http';
import https from 'https';
import { URL } from 'url';

type RequestOptions = http.RequestOptions | https.RequestOptions;
type RequestCallback = (res: http.IncomingMessage) => void;

const wrapRequestMethod = (
    originalRequestMethod: typeof http.request
): typeof http.request => {
    return function (
        this: typeof http | typeof https,
        url: string | RequestOptions | URL,
        options?: RequestOptions | RequestCallback,
        callback?: RequestCallback
    ) {
        let requestOptions: RequestOptions;
        if (typeof url === 'string' || url instanceof URL) {
            requestOptions =
                typeof options === 'function'
                    ? {}
                    : (options as RequestOptions) || {};
        } else {
            requestOptions = url as RequestOptions;
        }

        const req = (originalRequestMethod as any).call(
            this,
            url,
            options,
            callback
        );

        console.log(
            `HTTP request: ${requestOptions.method || 'GET'} ${
                requestOptions.hostname
            }${requestOptions.path}`
        );

        if ((requestOptions.method || 'GET').toUpperCase() === 'POST') {
            const body: Buffer[] = [];
            const originalWrite = req.write;
            const originalEnd = req.end;

            req.write = function (
                chunk: any,
                encoding?: string | undefined,
                // eslint-disable-next-line @typescript-eslint/ban-types
                cb?: Function | undefined
            ): boolean {
                if (chunk) {
                    body.push(
                        Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk)
                    );
                }
                // eslint-disable-next-line prefer-rest-params
                return originalWrite.apply(req, arguments as any);
            };

            // eslint-disable-next-line @typescript-eslint/ban-types
            req.end = function (
                chunk?: any,
                encoding?: string | undefined,
                // eslint-disable-next-line @typescript-eslint/ban-types
                cb?: Function | undefined
            ): void {
                if (chunk) {
                    body.push(
                        Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk)
                    );
                }
                const bodyString = Buffer.concat(body).toString();
                console.log('POST body:', bodyString);
                // eslint-disable-next-line prefer-rest-params
                return originalEnd.apply(req, arguments as any);
            };
        }

        return req;
    };
};

/**
 * Logs all requests (URLs and POST bodies) made by Node's http and https modules.
 */
function enableHttpLogger() {
    (http.request as any) = wrapRequestMethod(http.request);
    (https.request as any) = wrapRequestMethod(https.request);
}

/**
 * Logs all requests (URLs and POST bodies) made by Node's http and https modules.
 */
function disableHttpLogger() {
    (http.request as any) = (http as any).originalRequest;
    (https.request as any) = (https as any).originalRequest;
}

(http as any).originalRequest = http.request;
(https as any).originalRequest = https.request;

export { enableHttpLogger, disableHttpLogger };

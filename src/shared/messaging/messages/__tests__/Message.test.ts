import { validate as uuidValidate } from 'uuid';

import { createMessage } from '../Message';

import type { BasePayload, ErrorPayload } from '../payloads';

describe('Message Tests', () => {
    // Test case 1: Test the createMessage function with ID parameter
    it('should return a Message object with the provided id and BasePayload when called with both parameters', () => {
        const validBasePayload: BasePayload = {
            type: 'permission-request',
        };
        const testId = 'test-id';

        const result = createMessage(validBasePayload, testId);

        expect(result).toEqual({
            id: testId,
            payload: validBasePayload,
        });
    });

    // Test case 2: Test the createMessage function with ErrorPayload and without ID parameter
    it('should generate a new UUID for the id and return a Message object with ErrorPayload when called with only the payload parameter', () => {
        const validErrorPayload: ErrorPayload = {
            error: true,
            code: 400,
            message: 'Test error message',
        };

        const result = createMessage(validErrorPayload);

        expect(result.payload).toEqual(validErrorPayload);
        expect(result.id).toBeTruthy();
        expect(uuidValidate(result.id)).toBe(true);
    });
});

import type { PreapprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';

export const faker = {
    preapproval(): Preapproval {
        return {
            type: 'preapproval',
            address: 'abc',
            chain: 'abc:123', // type: IdentifierString
            target: 'target',
            objectId: 'abc', // type: ObjectId
            description: 'description',
            totalGasLimit: 10000,
            perTransactionGasLimit: 1000,
            maxTransactionCount: 100,
            approved: true,
            createdDate: 'today',
        };
    },
    preapprovalRequest({ id }: { id: string }): PreapprovalRequest {
        return {
            type: 'preapproval-request',
            id,
            preapproval: faker.preapproval(),
            origin: 'abc',
            originTitle: 'abc',
            approved: true,
            originFavIcon: 'abc',
            createdDate: 'today',
        };
    },
};

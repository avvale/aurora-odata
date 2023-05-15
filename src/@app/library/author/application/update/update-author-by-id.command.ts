import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateAuthorByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            surname?: string;
            country?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
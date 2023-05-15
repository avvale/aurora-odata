import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLAuthorsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
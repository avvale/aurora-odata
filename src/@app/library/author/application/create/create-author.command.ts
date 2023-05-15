import { CQMetadata } from '@aurorajs.dev/core';

export class CreateAuthorCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            surname?: string;
            country?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
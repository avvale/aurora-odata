import { CQMetadata } from '@aurorajs.dev/core';

export class CreateAuthorsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            surname?: string;
            country?: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
import { CreatedAuthorEvent } from './created-author.event';

export class CreatedAuthorsEvent
{
    constructor(
        public readonly authors: CreatedAuthorEvent[],
    ) {}
}
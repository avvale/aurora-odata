import { UpdatedAuthorEvent } from './updated-author.event';

export class UpdatedAuthorsEvent
{
    constructor(
        public readonly authors: UpdatedAuthorEvent[],
    ) {}
}
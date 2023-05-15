import { DeletedAuthorEvent } from './deleted-author.event';

export class DeletedAuthorsEvent
{
    constructor(
        public readonly authors: DeletedAuthorEvent[],
    ) {}
}
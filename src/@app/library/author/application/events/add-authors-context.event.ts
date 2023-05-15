import { AggregateRoot } from '@nestjs/cqrs';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { CreatedAuthorEvent } from './created-author.event';
import { CreatedAuthorsEvent } from './created-authors.event';
import { UpdatedAuthorEvent } from './updated-author.event';
import { UpdatedAuthorsEvent } from './updated-authors.event';
import { DeletedAuthorEvent } from './deleted-author.event';
import { DeletedAuthorsEvent } from './deleted-authors.event';

export class AddAuthorsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: LibraryAuthor[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CreatedAuthorsEvent(
                this.aggregateRoots.map(author =>
                    new CreatedAuthorEvent(
                        author.id.value,
                        author.name.value,
                        author.surname?.value,
                        author.country?.value,
                        author.createdAt?.value,
                        author.updatedAt?.value,
                        author.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedAuthorsEvent(
                this.aggregateRoots.map(author =>
                    new UpdatedAuthorEvent(
                        author.id.value,
                        author.name.value,
                        author.surname?.value,
                        author.country?.value,
                        author.createdAt?.value,
                        author.updatedAt?.value,
                        author.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedAuthorsEvent(
                this.aggregateRoots.map(author =>
                    new DeletedAuthorEvent(
                        author.id.value,
                        author.name.value,
                        author.surname?.value,
                        author.country?.value,
                        author.createdAt?.value,
                        author.updatedAt?.value,
                        author.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
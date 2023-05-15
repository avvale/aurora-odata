import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';
import { IAuthorRepository } from '../../domain/author.repository';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { AddAuthorsContextEvent } from '../events/add-authors-context.event';

@Injectable()
export class CreateAuthorsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAuthorRepository,
    ) {}

    async main(
        authors: {
            id: AuthorId;
            name: AuthorName;
            surname: AuthorSurname;
            country: AuthorCountry;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAuthors = authors.map(author => LibraryAuthor.register(
            author.id,
            author.name,
            author.surname,
            author.country,
            new AuthorCreatedAt({ currentTimestamp: true }),
            new AuthorUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateAuthors, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddAuthorsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const authorsRegistered = this.publisher.mergeObjectContext(new AddAuthorsContextEvent(aggregateAuthors));

        authorsRegistered.created(); // apply event to model events
        authorsRegistered.commit(); // commit all events of model
    }
}
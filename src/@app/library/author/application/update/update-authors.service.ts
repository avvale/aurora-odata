import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
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
export class UpdateAuthorsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAuthorRepository,
    ) {}

    async main(
        payload: {
            id?: AuthorId;
            name?: AuthorName;
            surname?: AuthorSurname;
            country?: AuthorCountry;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const author = LibraryAuthor.register(
            payload.id,
            payload.name,
            payload.surname,
            payload.country,
            null, // createdAt
            new AuthorUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(author, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const authors = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authorsRegister = this.publisher.mergeObjectContext(
            new AddAuthorsContextEvent(authors),
        );

        authorsRegister.updated(); // apply event to model events
        authorsRegister.commit(); // commit all events of model
    }
}
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

@Injectable()
export class UpdateAuthorByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAuthorRepository,
    ) {}

    async main(
        payload: {
            id: AuthorId;
            name?: AuthorName;
            surname?: AuthorSurname;
            country?: AuthorCountry;
        },
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

        // update by id
        await this.repository.updateById(author, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authorRegister = this.publisher.mergeObjectContext(
            author,
        );

        authorRegister.updated(author); // apply event to model events
        authorRegister.commit(); // commit all events of model
    }
}
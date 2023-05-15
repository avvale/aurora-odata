/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from './value-objects';
import { CreatedAuthorEvent } from '../application/events/created-author.event';
import { UpdatedAuthorEvent } from '../application/events/updated-author.event';
import { DeletedAuthorEvent } from '../application/events/deleted-author.event';

export class LibraryAuthor extends AggregateRoot
{
    id: AuthorId;
    name: AuthorName;
    surname: AuthorSurname;
    country: AuthorCountry;
    createdAt: AuthorCreatedAt;
    updatedAt: AuthorUpdatedAt;
    deletedAt: AuthorDeletedAt;

    // eager relationship

    constructor(
        id: AuthorId,
        name: AuthorName,
        surname: AuthorSurname,
        country: AuthorCountry,
        createdAt: AuthorCreatedAt,
        updatedAt: AuthorUpdatedAt,
        deletedAt: AuthorDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.country = country;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AuthorId,
        name: AuthorName,
        surname: AuthorSurname,
        country: AuthorCountry,
        createdAt: AuthorCreatedAt,
        updatedAt: AuthorUpdatedAt,
        deletedAt: AuthorDeletedAt,

    ): LibraryAuthor
    {
        return new LibraryAuthor(
            id,
            name,
            surname,
            country,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(author: LibraryAuthor): void
    {
        this.apply(
            new CreatedAuthorEvent(
                author.id.value,
                author.name.value,
                author.surname?.value,
                author.country?.value,
                author.createdAt?.value,
                author.updatedAt?.value,
                author.deletedAt?.value,
            ),
        );
    }

    updated(author: LibraryAuthor): void
    {
        this.apply(
            new UpdatedAuthorEvent(
                author.id?.value,
                author.name?.value,
                author.surname?.value,
                author.country?.value,
                author.createdAt?.value,
                author.updatedAt?.value,
                author.deletedAt?.value,
            ),
        );
    }

    deleted(author: LibraryAuthor): void
    {
        this.apply(
            new DeletedAuthorEvent(
                author.id.value,
                author.name.value,
                author.surname?.value,
                author.country?.value,
                author.createdAt?.value,
                author.updatedAt?.value,
                author.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            surname: this.surname?.value,
            country: this.country?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            surname: this.surname?.value,
            country: this.country?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}

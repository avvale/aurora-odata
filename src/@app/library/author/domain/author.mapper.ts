import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { LibraryAuthor } from './author.aggregate';
import { AuthorResponse } from './author.response';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from './value-objects';

export class AuthorMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param author
     */
    mapModelToAggregate(author: LiteralObject, cQMetadata?: CQMetadata): LibraryAuthor
    {
        if (!author) return;

        return this.makeAggregate(author, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param authors
     */
    mapModelsToAggregates(authors: LiteralObject[], cQMetadata?: CQMetadata): LibraryAuthor[]
    {
        if (!Array.isArray(authors)) return;

        return authors.map(author => this.makeAggregate(author, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param author
     */
    mapAggregateToResponse(author: LibraryAuthor): AuthorResponse
    {
        return this.makeResponse(author);
    }

    /**
     * Map array of aggregates to array responses
     * @param authors
     */
    mapAggregatesToResponses(authors: LibraryAuthor[]): AuthorResponse[]
    {
        if (!Array.isArray(authors)) return;

        return authors.map(author => this.makeResponse(author));
    }

    private makeAggregate(author: LiteralObject, cQMetadata?: CQMetadata): LibraryAuthor
    {
        return LibraryAuthor.register(
            new AuthorId(author.id, { undefinable: true }),
            new AuthorName(author.name, { undefinable: true }),
            new AuthorSurname(author.surname, { undefinable: true }),
            new AuthorCountry(author.country, { undefinable: true }),
            new AuthorCreatedAt(author.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AuthorUpdatedAt(author.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AuthorDeletedAt(author.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(author: LibraryAuthor): AuthorResponse
    {
        if (!author) return;

        return new AuthorResponse(
            author.id.value,
            author.name.value,
            author.surname.value,
            author.country.value,
            author.createdAt.value,
            author.updatedAt.value,
            author.deletedAt.value,
        );
    }
}
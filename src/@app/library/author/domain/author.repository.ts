
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { LibraryAuthor } from './author.aggregate';
import { AuthorId } from './value-objects';

export abstract class IAuthorRepository implements IRepository<LibraryAuthor>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<LibraryAuthor>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<LibraryAuthor | null>;

    // find a single record by id
    abstract findById(
        id: AuthorId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<LibraryAuthor | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<LibraryAuthor[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<LibraryAuthor[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        author: LibraryAuthor,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: LibraryAuthor) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: LibraryAuthor) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        authors: LibraryAuthor[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: LibraryAuthor) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        author: LibraryAuthor,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: LibraryAuthor) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        author: LibraryAuthor,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: LibraryAuthor) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        author: LibraryAuthor,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: LibraryAuthor) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AuthorId,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}
import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '@app/library/author/domain/value-objects';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { authors } from './mock-author.data';

@Injectable()
export class MockAuthorRepository extends MockRepository<LibraryAuthor> implements IAuthorRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'LibraryAuthor';
    public collectionSource: LibraryAuthor[];
    public deletedAtInstance: AuthorDeletedAt = new AuthorDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>authors)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(LibraryAuthor.register(
                new AuthorId(itemCollection.id),
                new AuthorName(itemCollection.name),
                new AuthorSurname(itemCollection.surname),
                new AuthorCountry(itemCollection.country),
                new AuthorCreatedAt(itemCollection.createdAt),
                new AuthorUpdatedAt(itemCollection.updatedAt),
                new AuthorDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
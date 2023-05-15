import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { authors } from './mock-author.data';
import * as _ from 'lodash';

@Injectable()
export class MockAuthorSeeder extends MockSeeder<LibraryAuthor>
{
    public collectionSource: LibraryAuthor[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const author of _.orderBy(authors, ['id']))
        {
            this.collectionSource.push(
                LibraryAuthor.register(
                    new AuthorId(author.id),
                    new AuthorName(author.name),
                    new AuthorSurname(author.surname),
                    new AuthorCountry(author.country),
                    new AuthorCreatedAt({ currentTimestamp: true }),
                    new AuthorUpdatedAt({ currentTimestamp: true }),
                    new AuthorDeletedAt(null),
                ),
            );
        }
    }
}
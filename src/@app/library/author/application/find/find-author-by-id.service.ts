import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IAuthorRepository } from '../../domain/author.repository';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { AuthorId } from '../../domain/value-objects';

@Injectable()
export class FindAuthorByIdService
{
    constructor(
        private readonly repository: IAuthorRepository,
    ) {}

    async main(
        id: AuthorId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<LibraryAuthor>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
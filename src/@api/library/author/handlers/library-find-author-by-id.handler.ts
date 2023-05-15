import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAuthorByIdQuery } from '@app/library/author/application/find/find-author-by-id.query';
import { LibraryAuthor } from '@api/graphql';
import { LibraryAuthorDto } from '../dto';

@Injectable()
export class LibraryFindAuthorByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        return await this.queryBus.ask(new FindAuthorByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
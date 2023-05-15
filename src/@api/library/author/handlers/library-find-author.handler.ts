import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAuthorQuery } from '@app/library/author/application/find/find-author.query';
import { LibraryAuthor } from '@api/graphql';
import { LibraryAuthorDto } from '../dto';

@Injectable()
export class LibraryFindAuthorHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        return await this.queryBus.ask(new FindAuthorQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
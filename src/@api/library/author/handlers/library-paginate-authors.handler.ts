import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateAuthorsQuery } from '@app/library/author/application/paginate/paginate-authors.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class LibraryPaginateAuthorsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAuthorsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
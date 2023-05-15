import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAuthorsQuery } from '@app/library/author/application/get/get-authors.query';
import { LibraryAuthor } from '@api/graphql';
import { LibraryAuthorDto } from '../dto';

@Injectable()
export class LibraryGetAuthorsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor[] | LibraryAuthorDto[]>
    {
        return await this.queryBus.ask(new GetAuthorsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
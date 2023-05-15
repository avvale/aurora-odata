import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAuthorsQuery } from '@app/library/author/application/get/get-authors.query';
import { DeleteAuthorsCommand } from '@app/library/author/application/delete/delete-authors.command';
import { LibraryAuthor } from '@api/graphql';
import { LibraryAuthorDto } from '../dto';

@Injectable()
export class LibraryDeleteAuthorsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor[] | LibraryAuthorDto[]>
    {
        const authors = await this.queryBus.ask(new GetAuthorsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteAuthorsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return authors;
    }
}
import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAuthorByIdQuery } from '@app/library/author/application/find/find-author-by-id.query';
import { DeleteAuthorByIdCommand } from '@app/library/author/application/delete/delete-author-by-id.command';
import { LibraryAuthor } from '@api/graphql';
import { LibraryAuthorDto } from '../dto';

@Injectable()
export class LibraryDeleteAuthorByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        const author = await this.queryBus.ask(new FindAuthorByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteAuthorByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return author;
    }
}
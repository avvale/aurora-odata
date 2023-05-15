import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAuthorsQuery } from '@app/library/author/application/get/get-authors.query';
import { UpdateAuthorsCommand } from '@app/library/author/application/update/update-authors.command';
import { LibraryAuthor, LibraryUpdateAuthorsInput } from '@api/graphql';
import { LibraryAuthorDto, LibraryUpdateAuthorsDto } from '../dto';

@Injectable()
export class LibraryUpdateAuthorsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: LibraryUpdateAuthorsInput | LibraryUpdateAuthorsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        await this.commandBus.dispatch(new UpdateAuthorsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetAuthorsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
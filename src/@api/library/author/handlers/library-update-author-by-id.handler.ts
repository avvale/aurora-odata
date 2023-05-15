import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

// @app
import { FindAuthorByIdQuery } from '@app/library/author/application/find/find-author-by-id.query';
import { UpdateAuthorByIdCommand } from '@app/library/author/application/update/update-author-by-id.command';
import { LibraryAuthor, LibraryUpdateAuthorByIdInput } from '@api/graphql';
import { LibraryAuthorDto, LibraryUpdateAuthorByIdDto } from '../dto';

@Injectable()
export class LibraryUpdateAuthorByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: LibraryUpdateAuthorByIdInput | LibraryUpdateAuthorByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        const author = await this.queryBus.ask(new FindAuthorByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, author);

        await this.commandBus.dispatch(new UpdateAuthorByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindAuthorByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
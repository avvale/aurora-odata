import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindAuthorByIdQuery } from '@app/library/author/application/find/find-author-by-id.query';
import { UpsertAuthorCommand } from '@app/library/author/application/upsert/upsert-author.command';
import { LibraryAuthor, LibraryUpdateAuthorByIdInput } from '@api/graphql';
import { LibraryAuthorDto, LibraryUpdateAuthorByIdDto } from '../dto';

@Injectable()
export class LibraryUpsertAuthorHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: LibraryUpdateAuthorByIdInput | LibraryUpdateAuthorByIdDto,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        await this.commandBus.dispatch(new UpsertAuthorCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindAuthorByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
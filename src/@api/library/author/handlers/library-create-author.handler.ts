import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindAuthorByIdQuery } from '@app/library/author/application/find/find-author-by-id.query';
import { CreateAuthorCommand } from '@app/library/author/application/create/create-author.command';
import { LibraryAuthor, LibraryCreateAuthorInput } from '@api/graphql';
import { LibraryAuthorDto, LibraryCreateAuthorDto } from '../dto';

@Injectable()
export class LibraryCreateAuthorHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: LibraryCreateAuthorInput | LibraryCreateAuthorDto,
        timezone?: string,
    ): Promise<LibraryAuthor | LibraryAuthorDto>
    {
        await this.commandBus.dispatch(new CreateAuthorCommand(
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
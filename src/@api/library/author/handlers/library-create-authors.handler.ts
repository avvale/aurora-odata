import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateAuthorsCommand } from '@app/library/author/application/create/create-authors.command';
import { LibraryCreateAuthorInput } from '@api/graphql';
import { LibraryCreateAuthorDto } from '../dto';

@Injectable()
export class LibraryCreateAuthorsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: LibraryCreateAuthorInput[] | LibraryCreateAuthorDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAuthorsCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}
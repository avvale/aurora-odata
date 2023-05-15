import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateAuthorsCommand } from '@app/library/author/application/create/create-authors.command';
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

@Injectable()
export class LibraryAuthorSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAuthorsCommand(
            authors,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
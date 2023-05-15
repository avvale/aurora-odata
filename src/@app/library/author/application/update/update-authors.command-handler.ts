/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorsCommand } from './update-authors.command';
import { UpdateAuthorsService } from './update-authors.service';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAuthorsCommand)
export class UpdateAuthorsCommandHandler implements ICommandHandler<UpdateAuthorsCommand>
{
    constructor(
        private readonly updateAuthorsService: UpdateAuthorsService,
    ) {}

    async execute(command: UpdateAuthorsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthorsService.main(
            {
                id: new AuthorId(command.payload.id, { undefinable: true }),
                name: new AuthorName(command.payload.name, { undefinable: true }),
                surname: new AuthorSurname(command.payload.surname),
                country: new AuthorCountry(command.payload.country),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
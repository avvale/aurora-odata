/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorByIdCommand } from './update-author-by-id.command';
import { UpdateAuthorByIdService } from './update-author-by-id.service';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAuthorByIdCommand)
export class UpdateAuthorByIdCommandHandler implements ICommandHandler<UpdateAuthorByIdCommand>
{
    constructor(
        private readonly updateAuthorByIdService: UpdateAuthorByIdService,
    ) {}

    async execute(command: UpdateAuthorByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthorByIdService.main(
            {
                id: new AuthorId(command.payload.id),
                name: new AuthorName(command.payload.name, { undefinable: true }),
                surname: new AuthorSurname(command.payload.surname),
                country: new AuthorCountry(command.payload.country),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
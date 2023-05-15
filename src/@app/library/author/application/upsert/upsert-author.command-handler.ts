/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertAuthorCommand } from './upsert-author.command';
import { UpsertAuthorService } from './upsert-author.service';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertAuthorCommand)
export class UpsertAuthorCommandHandler implements ICommandHandler<UpsertAuthorCommand>
{
    constructor(
        private readonly upsertAuthorService: UpsertAuthorService,
    ) {}

    async execute(command: UpsertAuthorCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAuthorService.main(
            {
                id: new AuthorId(command.payload.id),
                name: new AuthorName(command.payload.name),
                surname: new AuthorSurname(command.payload.surname),
                country: new AuthorCountry(command.payload.country),
            },
            command.cQMetadata,
        );
    }
}
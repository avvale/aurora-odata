/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorsCommand } from './create-authors.command';
import { CreateAuthorsService } from './create-authors.service';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateAuthorsCommand)
export class CreateAuthorsCommandHandler implements ICommandHandler<CreateAuthorsCommand>
{
    constructor(
        private readonly createAuthorsService: CreateAuthorsService,
    ) {}

    async execute(command: CreateAuthorsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAuthorsService.main(
            command.payload
                .map(author =>
                {
                    return {
                        id: new AuthorId(author.id),
                        name: new AuthorName(author.name),
                        surname: new AuthorSurname(author.surname),
                        country: new AuthorCountry(author.country),
                    };
                }),
            command.cQMetadata,
        );
    }
}
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorByIdCommand } from './delete-author-by-id.command';
import { DeleteAuthorByIdService } from './delete-author-by-id.service';
import {
    AuthorId
} from '../../domain/value-objects';

@CommandHandler(DeleteAuthorByIdCommand)
export class DeleteAuthorByIdCommandHandler implements ICommandHandler<DeleteAuthorByIdCommand>
{
    constructor(
        private readonly deleteAuthorByIdService: DeleteAuthorByIdService,
    ) {}

    async execute(command: DeleteAuthorByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthorByIdService.main(
            new AuthorId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
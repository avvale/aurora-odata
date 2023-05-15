import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorsCommand } from './delete-authors.command';
import { DeleteAuthorsService } from './delete-authors.service';

@CommandHandler(DeleteAuthorsCommand)
export class DeleteAuthorsCommandHandler implements ICommandHandler<DeleteAuthorsCommand>
{
    constructor(
        private readonly deleteAuthorsService: DeleteAuthorsService,
    ) {}

    async execute(command: DeleteAuthorsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthorsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
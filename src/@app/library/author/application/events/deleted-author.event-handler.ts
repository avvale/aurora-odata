import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAuthorEvent } from './deleted-author.event';

@EventsHandler(DeletedAuthorEvent)
export class DeletedAuthorEventHandler implements IEventHandler<DeletedAuthorEvent>
{
    handle(event: DeletedAuthorEvent): void
    {
        // console.log('DeletedAuthorEvent: ', event);
    }
}
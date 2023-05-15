import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAuthorsEvent } from './deleted-authors.event';

@EventsHandler(DeletedAuthorsEvent)
export class DeletedAuthorsEventHandler implements IEventHandler<DeletedAuthorsEvent>
{
    handle(event: DeletedAuthorsEvent): void
    {
        // console.log('DeletedAuthorsEvent: ', event);
    }
}
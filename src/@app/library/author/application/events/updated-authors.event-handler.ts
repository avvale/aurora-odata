import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAuthorsEvent } from './updated-authors.event';

@EventsHandler(UpdatedAuthorsEvent)
export class UpdatedAuthorsEventHandler implements IEventHandler<UpdatedAuthorsEvent>
{
    handle(event: UpdatedAuthorsEvent): void
    {
        // console.log('UpdatedAuthorsEvent: ', event);
    }
}
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAuthorsEvent } from './created-authors.event';

@EventsHandler(CreatedAuthorsEvent)
export class CreatedAuthorsEventHandler implements IEventHandler<CreatedAuthorsEvent>
{
    handle(event: CreatedAuthorsEvent): void
    {
        // console.log('CreatedAuthorsEvent: ', event);
    }
}
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAuthorEvent } from './created-author.event';

@EventsHandler(CreatedAuthorEvent)
export class CreatedAuthorEventHandler implements IEventHandler<CreatedAuthorEvent>
{
    handle(event: CreatedAuthorEvent): void
    {
        // console.log('CreatedAuthorEvent: ', event);
    }
}
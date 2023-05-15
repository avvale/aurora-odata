import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAuthorEvent } from './updated-author.event';

@EventsHandler(UpdatedAuthorEvent)
export class UpdatedAuthorEventHandler implements IEventHandler<UpdatedAuthorEvent>
{
    handle(event: UpdatedAuthorEvent): void
    {
        // console.log('UpdatedAuthorEvent: ', event);
    }
}
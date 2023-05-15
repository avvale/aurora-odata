import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { LibraryCreateAuthorsHandler } from './library-create-authors.handler';
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryCreateAuthorsHandler', () =>
{
    let handler: LibraryCreateAuthorsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LibraryCreateAuthorsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<LibraryCreateAuthorsHandler>(LibraryCreateAuthorsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('LibraryCreateAuthorsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an authors created', async () =>
        {
            expect(await handler.main(authors)).toBe(true);
        });
    });
});
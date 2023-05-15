/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { LibraryPaginateAuthorsHandler } from './library-paginate-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryPaginateAuthorsHandler', () =>
{
    let handler: LibraryPaginateAuthorsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryPaginateAuthorsHandler,
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

        handler = module.get<LibraryPaginateAuthorsHandler>(LibraryPaginateAuthorsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('LibraryPaginateAuthorsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryPaginateAuthorsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authors', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: authors.length,
                count: authors.length,
                rows : authors,
            })));
            expect(await handler.main()).toEqual({
                total: authors.length,
                count: authors.length,
                rows : authors,
            });
        });
    });
});
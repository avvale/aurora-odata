/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { LibraryFindAuthorByIdHandler } from './library-find-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryFindAuthorByIdHandler', () =>
{
    let handler: LibraryFindAuthorByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryFindAuthorByIdHandler,
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

        handler = module.get<LibraryFindAuthorByIdHandler>(LibraryFindAuthorByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('LibraryFindAuthorByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryFindAuthorByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an author by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await handler.main(authors[0].id)).toBe(authors[0]);
        });
    });
});
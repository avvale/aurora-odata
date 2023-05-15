/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { LibraryUpdateAuthorByIdHandler } from './library-update-author-by-id.handler';
import { LibraryUpdateAuthorByIdInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpdateAuthorByIdHandler', () =>
{
    let handler: LibraryUpdateAuthorByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryUpdateAuthorByIdHandler,
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

        handler = module.get<LibraryUpdateAuthorByIdHandler>(LibraryUpdateAuthorByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('LibraryUpdateAuthorByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryUpdateAuthorByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a author updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await handler.main(<LibraryUpdateAuthorByIdInput>authors[0])).toBe(authors[0]);
        });
    });
});
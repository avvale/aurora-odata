/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpsertAuthorResolver } from './library-upsert-author.resolver';
import { LibraryUpsertAuthorHandler } from '../handlers/library-upsert-author.handler';
import { LibraryUpdateAuthorByIdInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpsertAuthorResolver', () =>
{
    let resolver: LibraryUpsertAuthorResolver;
    let handler: LibraryUpsertAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryUpsertAuthorResolver,
                {
                    provide : LibraryUpsertAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryUpsertAuthorResolver>(LibraryUpsertAuthorResolver);
        handler = module.get<LibraryUpsertAuthorHandler>(LibraryUpsertAuthorHandler);
    });

    test('LibraryUpsertAuthorResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryUpsertAuthorResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an author upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(<LibraryUpdateAuthorByIdInput>authors[0])).toBe(authors[0]);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpdateAuthorByIdResolver } from './library-update-author-by-id.resolver';
import { LibraryUpdateAuthorByIdHandler } from '../handlers/library-update-author-by-id.handler';
import { LibraryUpdateAuthorByIdInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpdateAuthorByIdResolver', () =>
{
    let resolver: LibraryUpdateAuthorByIdResolver;
    let handler: LibraryUpdateAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryUpdateAuthorByIdResolver,
                {
                    provide : LibraryUpdateAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryUpdateAuthorByIdResolver>(LibraryUpdateAuthorByIdResolver);
        handler = module.get<LibraryUpdateAuthorByIdHandler>(LibraryUpdateAuthorByIdHandler);
    });

    test('LibraryUpdateAuthorByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryUpdateAuthorByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a author by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(<LibraryUpdateAuthorByIdInput>authors[0])).toBe(authors[0]);
        });
    });
});
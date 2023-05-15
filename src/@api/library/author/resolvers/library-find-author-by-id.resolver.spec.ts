/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryFindAuthorByIdResolver } from './library-find-author-by-id.resolver';
import { LibraryFindAuthorByIdHandler } from '../handlers/library-find-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryFindAuthorByIdResolver', () =>
{
    let resolver: LibraryFindAuthorByIdResolver;
    let handler: LibraryFindAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryFindAuthorByIdResolver,
                {
                    provide : LibraryFindAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryFindAuthorByIdResolver>(LibraryFindAuthorByIdResolver);
        handler = module.get<LibraryFindAuthorByIdHandler>(LibraryFindAuthorByIdHandler);
    });

    test('LibraryFindAuthorByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryFindAuthorByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an author by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(authors[0].id)).toBe(authors[0]);
        });
    });
});
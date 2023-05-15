/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryDeleteAuthorByIdResolver } from './library-delete-author-by-id.resolver';
import { LibraryDeleteAuthorByIdHandler } from '../handlers/library-delete-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryDeleteAuthorByIdResolver', () =>
{
    let resolver: LibraryDeleteAuthorByIdResolver;
    let handler: LibraryDeleteAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryDeleteAuthorByIdResolver,
                {
                    provide : LibraryDeleteAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryDeleteAuthorByIdResolver>(LibraryDeleteAuthorByIdResolver);
        handler = module.get<LibraryDeleteAuthorByIdHandler>(LibraryDeleteAuthorByIdHandler);
    });

    test('LibraryDeleteAuthorByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryDeleteAuthorByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an author deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(authors[0].id)).toBe(authors[0]);
        });
    });
});
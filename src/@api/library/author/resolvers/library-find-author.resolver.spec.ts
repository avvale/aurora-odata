/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryFindAuthorResolver } from './library-find-author.resolver';
import { LibraryFindAuthorHandler } from '../handlers/library-find-author.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryFindAuthorResolver', () =>
{
    let resolver: LibraryFindAuthorResolver;
    let handler: LibraryFindAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryFindAuthorResolver,
                {
                    provide : LibraryFindAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryFindAuthorResolver>(LibraryFindAuthorResolver);
        handler = module.get<LibraryFindAuthorHandler>(LibraryFindAuthorHandler);
    });

    test('LibraryFindAuthorResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryFindAuthorResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a author', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main()).toBe(authors[0]);
        });
    });
});
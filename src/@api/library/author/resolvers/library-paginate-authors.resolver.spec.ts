/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryPaginateAuthorsResolver } from './library-paginate-authors.resolver';
import { LibraryPaginateAuthorsHandler } from '../handlers/library-paginate-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryPaginateAuthorsResolver', () =>
{
    let resolver: LibraryPaginateAuthorsResolver;
    let handler: LibraryPaginateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryPaginateAuthorsResolver,
                {
                    provide : LibraryPaginateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryPaginateAuthorsResolver>(LibraryPaginateAuthorsResolver);
        handler = module.get<LibraryPaginateAuthorsHandler>(LibraryPaginateAuthorsHandler);
    });

    test('LibraryPaginateAuthorsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryPaginateAuthorsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authors', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : authors,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : authors,
            });
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryGetAuthorsResolver } from './library-get-authors.resolver';
import { LibraryGetAuthorsHandler } from '../handlers/library-get-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryGetAuthorsResolver', () =>
{
    let resolver: LibraryGetAuthorsResolver;
    let handler: LibraryGetAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryGetAuthorsResolver,
                {
                    provide : LibraryGetAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryGetAuthorsResolver>(LibraryGetAuthorsResolver);
        handler = module.get<LibraryGetAuthorsHandler>(LibraryGetAuthorsHandler);
    });

    test('LibraryGetAuthorsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryGetAuthorsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a authors', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors)));
            expect(await resolver.main()).toBe(authors);
        });
    });
});
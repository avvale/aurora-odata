/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryDeleteAuthorsResolver } from './library-delete-authors.resolver';
import { LibraryDeleteAuthorsHandler } from '../handlers/library-delete-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryDeleteAuthorsResolver', () =>
{
    let resolver: LibraryDeleteAuthorsResolver;
    let handler: LibraryDeleteAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryDeleteAuthorsResolver,
                {
                    provide : LibraryDeleteAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryDeleteAuthorsResolver>(LibraryDeleteAuthorsResolver);
        handler = module.get<LibraryDeleteAuthorsHandler>(LibraryDeleteAuthorsHandler);
    });

    test('LibraryDeleteAuthorsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryDeleteAuthorsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authors deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors)));
            expect(await resolver.main()).toBe(authors);
        });
    });
});
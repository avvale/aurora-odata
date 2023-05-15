/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpdateAuthorsResolver } from './library-update-authors.resolver';
import { LibraryUpdateAuthorsHandler } from '../handlers/library-update-authors.handler';
import { LibraryUpdateAuthorsInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpdateAuthorsResolver', () =>
{
    let resolver: LibraryUpdateAuthorsResolver;
    let handler: LibraryUpdateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryUpdateAuthorsResolver,
                {
                    provide : LibraryUpdateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryUpdateAuthorsResolver>(LibraryUpdateAuthorsResolver);
        handler = module.get<LibraryUpdateAuthorsHandler>(LibraryUpdateAuthorsHandler);
    });

    test('LibraryUpdateAuthorsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryUpdateAuthorsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a authors updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(<LibraryUpdateAuthorsInput>authors[0])).toBe(authors[0]);
        });
    });
});
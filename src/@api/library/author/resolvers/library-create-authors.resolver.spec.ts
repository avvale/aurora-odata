import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryCreateAuthorsResolver } from './library-create-authors.resolver';
import { LibraryCreateAuthorsHandler } from '../handlers/library-create-authors.handler';
import { LibraryCreateAuthorInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryCreateAuthorsResolver', () =>
{
    let resolver: LibraryCreateAuthorsResolver;
    let handler: LibraryCreateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LibraryCreateAuthorsResolver,
                {
                    provide : LibraryCreateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryCreateAuthorsResolver>(LibraryCreateAuthorsResolver);
        handler = module.get<LibraryCreateAuthorsHandler>(LibraryCreateAuthorsHandler);
    });

    test('LibraryCreateAuthorsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryCreateAuthorsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authors created', async () =>
        {
            expect(await resolver.main(<LibraryCreateAuthorInput[]>authors)).toBe(undefined);
        });
    });
});
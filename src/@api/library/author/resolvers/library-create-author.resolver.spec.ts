/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryCreateAuthorResolver } from './library-create-author.resolver';
import { LibraryCreateAuthorHandler } from '../handlers/library-create-author.handler';
import { LibraryCreateAuthorInput } from '@api/graphql';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryCreateAuthorResolver', () =>
{
    let resolver: LibraryCreateAuthorResolver;
    let handler: LibraryCreateAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                LibraryCreateAuthorResolver,
                {
                    provide : LibraryCreateAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<LibraryCreateAuthorResolver>(LibraryCreateAuthorResolver);
        handler = module.get<LibraryCreateAuthorHandler>(LibraryCreateAuthorHandler);
    });

    test('LibraryCreateAuthorResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('LibraryCreateAuthorResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an author created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await resolver.main(<LibraryCreateAuthorInput>authors[0])).toBe(authors[0]);
        });
    });
});
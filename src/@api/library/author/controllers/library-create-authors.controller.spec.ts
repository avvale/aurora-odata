import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryCreateAuthorsController } from './library-create-authors.controller';
import { LibraryCreateAuthorsHandler } from '../handlers/library-create-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryCreateAuthorsController', () =>
{
    let controller: LibraryCreateAuthorsController;
    let handler: LibraryCreateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                LibraryCreateAuthorsController,
            ],
            providers: [
                {
                    provide : LibraryCreateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryCreateAuthorsController>(LibraryCreateAuthorsController);
        handler = module.get<LibraryCreateAuthorsHandler>(LibraryCreateAuthorsHandler);
    });

    describe('main', () =>
    {
        test('LibraryCreateAuthorsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authors created', async () =>
        {
            expect(await controller.main(authors)).toBe(undefined);
        });
    });
});
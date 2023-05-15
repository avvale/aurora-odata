/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryGetAuthorsController } from './library-get-authors.controller';
import { LibraryGetAuthorsHandler } from '../handlers/library-get-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryGetAuthorsController', () =>
{
    let controller: LibraryGetAuthorsController;
    let handler: LibraryGetAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryGetAuthorsController,
            ],
            providers: [
                {
                    provide : LibraryGetAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryGetAuthorsController>(LibraryGetAuthorsController);
        handler = module.get<LibraryGetAuthorsHandler>(LibraryGetAuthorsHandler);
    });

    describe('main', () =>
    {
        test('LibraryGetAuthorsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authors', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors)));
            expect(await controller.main()).toBe(authors);
        });
    });
});
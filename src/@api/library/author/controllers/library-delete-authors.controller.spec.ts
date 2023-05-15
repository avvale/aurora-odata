/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryDeleteAuthorsController } from './library-delete-authors.controller';
import { LibraryDeleteAuthorsHandler } from '../handlers/library-delete-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryDeleteAuthorsController', () =>
{
    let controller: LibraryDeleteAuthorsController;
    let handler: LibraryDeleteAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryDeleteAuthorsController,
            ],
            providers: [
                {
                    provide : LibraryDeleteAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryDeleteAuthorsController>(LibraryDeleteAuthorsController);
        handler = module.get<LibraryDeleteAuthorsHandler>(LibraryDeleteAuthorsHandler);
    });

    describe('main', () =>
    {
        test('LibraryDeleteAuthorsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authors deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors)));
            expect(await controller.main()).toBe(authors);
        });
    });
});
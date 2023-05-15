/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpdateAuthorsController } from './library-update-authors.controller';
import { LibraryUpdateAuthorsHandler } from '../handlers/library-update-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpdateAuthorsController', () =>
{
    let controller: LibraryUpdateAuthorsController;
    let handler: LibraryUpdateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryUpdateAuthorsController,
            ],
            providers: [
                {
                    provide : LibraryUpdateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryUpdateAuthorsController>(LibraryUpdateAuthorsController);
        handler = module.get<LibraryUpdateAuthorsHandler>(LibraryUpdateAuthorsHandler);
    });

    describe('main', () =>
    {
        test('LibraryUpdateAuthorsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authors updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0])).toBe(authors[0]);
        });
    });
});
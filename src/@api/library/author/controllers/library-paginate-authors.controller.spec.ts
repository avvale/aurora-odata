/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryPaginateAuthorsController } from './library-paginate-authors.controller';
import { LibraryPaginateAuthorsHandler } from '../handlers/library-paginate-authors.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryPaginateAuthorsController', () =>
{
    let controller: LibraryPaginateAuthorsController;
    let handler: LibraryPaginateAuthorsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryPaginateAuthorsController,
            ],
            providers: [
                {
                    provide : LibraryPaginateAuthorsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryPaginateAuthorsController>(LibraryPaginateAuthorsController);
        handler = module.get<LibraryPaginateAuthorsHandler>(LibraryPaginateAuthorsHandler);
    });

    describe('main', () =>
    {
        test('LibraryPaginateAuthorsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authors', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : authors,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : authors,
            });
        });
    });
});
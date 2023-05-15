/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryFindAuthorByIdController } from './library-find-author-by-id.controller';
import { LibraryFindAuthorByIdHandler } from '../handlers/library-find-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryFindAuthorByIdController', () =>
{
    let controller: LibraryFindAuthorByIdController;
    let handler: LibraryFindAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryFindAuthorByIdController,
            ],
            providers: [
                {
                    provide : LibraryFindAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryFindAuthorByIdController>(LibraryFindAuthorByIdController);
        handler = module.get<LibraryFindAuthorByIdHandler>(LibraryFindAuthorByIdHandler);
    });

    describe('main', () =>
    {
        test('LibraryFindAuthorByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an author by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0].id)).toBe(authors[0]);
        });
    });
});
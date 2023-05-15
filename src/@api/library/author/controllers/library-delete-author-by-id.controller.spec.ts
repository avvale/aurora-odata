/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryDeleteAuthorByIdController } from './library-delete-author-by-id.controller';
import { LibraryDeleteAuthorByIdHandler } from '../handlers/library-delete-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryDeleteAuthorByIdController', () =>
{
    let controller: LibraryDeleteAuthorByIdController;
    let handler: LibraryDeleteAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryDeleteAuthorByIdController,
            ],
            providers: [
                {
                    provide : LibraryDeleteAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryDeleteAuthorByIdController>(LibraryDeleteAuthorByIdController);
        handler = module.get<LibraryDeleteAuthorByIdHandler>(LibraryDeleteAuthorByIdHandler);
    });

    describe('main', () =>
    {
        test('LibraryDeleteAuthorByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an author deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0].id)).toBe(authors[0]);
        });
    });
});
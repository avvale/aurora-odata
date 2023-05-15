/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpdateAuthorByIdController } from './library-update-author-by-id.controller';
import { LibraryUpdateAuthorByIdHandler } from '../handlers/library-update-author-by-id.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpdateAuthorByIdController', () =>
{
    let controller: LibraryUpdateAuthorByIdController;
    let handler: LibraryUpdateAuthorByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryUpdateAuthorByIdController,
            ],
            providers: [
                {
                    provide : LibraryUpdateAuthorByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryUpdateAuthorByIdController>(LibraryUpdateAuthorByIdController);
        handler = module.get<LibraryUpdateAuthorByIdHandler>(LibraryUpdateAuthorByIdHandler);
    });

    describe('main', () =>
    {
        test('LibraryUpdateAuthorByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a author updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0])).toBe(authors[0]);
        });
    });
});
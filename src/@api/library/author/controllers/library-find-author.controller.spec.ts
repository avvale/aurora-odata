/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryFindAuthorController } from './library-find-author.controller';
import { LibraryFindAuthorHandler } from '../handlers/library-find-author.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryFindAuthorController', () =>
{
    let controller: LibraryFindAuthorController;
    let handler: LibraryFindAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryFindAuthorController,
            ],
            providers: [
                {
                    provide : LibraryFindAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryFindAuthorController>(LibraryFindAuthorController);
        handler = module.get<LibraryFindAuthorHandler>(LibraryFindAuthorHandler);
    });

    describe('main', () =>
    {
        test('LibraryFindAuthorController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a author', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main()).toBe(authors[0]);
        });
    });
});
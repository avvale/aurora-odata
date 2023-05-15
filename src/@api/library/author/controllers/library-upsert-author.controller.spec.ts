/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryUpsertAuthorController } from './library-upsert-author.controller';
import { LibraryUpsertAuthorHandler } from '../handlers/library-upsert-author.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryUpsertAuthorController', () =>
{
    let controller: LibraryUpsertAuthorController;
    let handler: LibraryUpsertAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryUpsertAuthorController,
            ],
            providers: [
                {
                    provide : LibraryUpsertAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryUpsertAuthorController>(LibraryUpsertAuthorController);
        handler = module.get<LibraryUpsertAuthorHandler>(LibraryUpsertAuthorHandler);
    });

    describe('main', () =>
    {
        test('LibraryUpsertAuthorController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an author upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0])).toBe(authors[0]);
        });
    });
});
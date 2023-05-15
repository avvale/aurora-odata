/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { LibraryCreateAuthorController } from './library-create-author.controller';
import { LibraryCreateAuthorHandler } from '../handlers/library-create-author.handler';

// sources
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';

describe('LibraryCreateAuthorController', () =>
{
    let controller: LibraryCreateAuthorController;
    let handler: LibraryCreateAuthorHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                LibraryCreateAuthorController,
            ],
            providers: [
                {
                    provide : LibraryCreateAuthorHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<LibraryCreateAuthorController>(LibraryCreateAuthorController);
        handler = module.get<LibraryCreateAuthorHandler>(LibraryCreateAuthorHandler);
    });

    describe('main', () =>
    {
        test('LibraryCreateAuthorController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an author created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(authors[0])));
            expect(await controller.main(authors[0])).toBe(authors[0]);
        });
    });
});
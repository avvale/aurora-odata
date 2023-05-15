import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { UpdateAuthorByIdCommandHandler } from './update-author-by-id.command-handler';
import { UpdateAuthorByIdCommand } from './update-author-by-id.command';
import { UpdateAuthorByIdService } from './update-author-by-id.service';

describe('UpdateAuthorByIdCommandHandler', () =>
{
    let commandHandler: UpdateAuthorByIdCommandHandler;
    let service: UpdateAuthorByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAuthorByIdCommandHandler,
                {
                    provide : UpdateAuthorByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateAuthorByIdCommandHandler>(UpdateAuthorByIdCommandHandler);
        service = module.get<UpdateAuthorByIdService>(UpdateAuthorByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAuthorByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an author created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAuthorByIdCommand(
                    {
                        id: authors[0].id,
                        name: authors[0].name,
                        surname: authors[0].surname,
                        country: authors[0].country,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
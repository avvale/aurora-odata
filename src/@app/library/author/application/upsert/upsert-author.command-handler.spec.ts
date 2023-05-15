import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { UpsertAuthorCommandHandler } from './upsert-author.command-handler';
import { UpsertAuthorCommand } from './upsert-author.command';
import { UpsertAuthorService } from './upsert-author.service';

describe('UpsertAuthorCommandHandler', () =>
{
    let commandHandler: UpsertAuthorCommandHandler;
    let service: UpsertAuthorService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertAuthorCommandHandler,
                {
                    provide : UpsertAuthorService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpsertAuthorCommandHandler>(UpsertAuthorCommandHandler);
        service = module.get<UpsertAuthorService>(UpsertAuthorService);
    });

    describe('main', () =>
    {
        test('UpsertAuthorCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertAuthorService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertAuthorCommand(
                    {
                        id: authors[0].id,
                        name: authors[0].name,
                        surname: authors[0].surname,
                        country: authors[0].country,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
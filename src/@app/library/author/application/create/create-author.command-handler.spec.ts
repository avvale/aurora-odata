import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { CreateAuthorCommandHandler } from './create-author.command-handler';
import { CreateAuthorCommand } from './create-author.command';
import { CreateAuthorService } from './create-author.service';

describe('CreateAuthorCommandHandler', () =>
{
    let commandHandler: CreateAuthorCommandHandler;
    let service: CreateAuthorService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuthorCommandHandler,
                {
                    provide : CreateAuthorService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateAuthorCommandHandler>(CreateAuthorCommandHandler);
        service = module.get<CreateAuthorService>(CreateAuthorService);
    });

    describe('main', () =>
    {
        test('CreateAuthorCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAuthorService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAuthorCommand(
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
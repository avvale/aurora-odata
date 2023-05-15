import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { UpdateAuthorsCommandHandler } from './update-authors.command-handler';
import { UpdateAuthorsCommand } from './update-authors.command';
import { UpdateAuthorsService } from './update-authors.service';

describe('UpdateAuthorsCommandHandler', () =>
{
    let commandHandler: UpdateAuthorsCommandHandler;
    let service: UpdateAuthorsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAuthorsCommandHandler,
                {
                    provide : UpdateAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateAuthorsCommandHandler>(UpdateAuthorsCommandHandler);
        service = module.get<UpdateAuthorsService>(UpdateAuthorsService);
    });

    describe('main', () =>
    {
        test('UpdateAuthorsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an authors updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAuthorsCommand(
                    {
                        id: authors[0].id,
                        name: authors[0].name,
                        surname: authors[0].surname,
                        country: authors[0].country,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAuthorsCommandHandler } from './delete-authors.command-handler';
import { DeleteAuthorsCommand } from './delete-authors.command';
import { DeleteAuthorsService } from './delete-authors.service';

describe('DeleteAuthorsCommandHandler', () =>
{
    let commandHandler: DeleteAuthorsCommandHandler;
    let service: DeleteAuthorsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAuthorsCommandHandler,
                {
                    provide : DeleteAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteAuthorsCommandHandler>(DeleteAuthorsCommandHandler);
        service = module.get<DeleteAuthorsService>(DeleteAuthorsService);
    });

    describe('main', () =>
    {
        test('DeleteAuthorsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAuthorsCommand(),
            )).toBe(undefined);
        });
    });
});
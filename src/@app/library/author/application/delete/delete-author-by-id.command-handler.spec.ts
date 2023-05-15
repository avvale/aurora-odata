import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAuthorByIdCommandHandler } from './delete-author-by-id.command-handler';
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { DeleteAuthorByIdCommand } from './delete-author-by-id.command';
import { DeleteAuthorByIdService } from './delete-author-by-id.service';

describe('DeleteAuthorByIdCommandHandler', () =>
{
    let commandHandler: DeleteAuthorByIdCommandHandler;
    let service: DeleteAuthorByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAuthorByIdCommandHandler,
                {
                    provide : DeleteAuthorByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteAuthorByIdCommandHandler>(DeleteAuthorByIdCommandHandler);
        service = module.get<DeleteAuthorByIdService>(DeleteAuthorByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAuthorByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAuthorByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAuthorByIdCommand(
                    authors[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
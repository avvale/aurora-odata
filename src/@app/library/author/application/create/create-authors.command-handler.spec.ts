/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { CreateAuthorsCommandHandler } from './create-authors.command-handler';
import { CreateAuthorsCommand } from './create-authors.command';
import { CreateAuthorsService } from './create-authors.service';

describe('CreateAuthorsCommandHandler', () =>
{
    let commandHandler: CreateAuthorsCommandHandler;
    let service: CreateAuthorsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuthorsCommandHandler,
                {
                    provide : CreateAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateAuthorsCommandHandler>(CreateAuthorsCommandHandler);
        service = module.get<CreateAuthorsService>(CreateAuthorsService);
    });

    describe('main', () =>
    {
        test('CreateAuthorsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return authors createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAuthorsCommand(
                    authors,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { UpdateAuthorsService } from './update-authors.service';
import {
    AuthorId,
    AuthorName,
    AuthorSurname,
    AuthorCountry,
    AuthorCreatedAt,
    AuthorUpdatedAt,
    AuthorDeletedAt,
} from '../../domain/value-objects';
import { IAuthorRepository } from '../../domain/author.repository';
import { MockAuthorRepository } from '../../infrastructure/mock/mock-author.repository';

describe('UpdateAuthorsService', () =>
{
    let service: UpdateAuthorsService;
    let repository: IAuthorRepository;
    let mockRepository: MockAuthorRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAuthorsService,
                MockAuthorRepository,
                {
                    provide : IAuthorRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpdateAuthorsService);
        repository = module.get(IAuthorRepository);
        mockRepository = module.get(MockAuthorRepository);
    });

    describe('main', () =>
    {
        test('UpdateAuthorsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a authors and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AuthorId(authors[0].id),
                    name: new AuthorName(authors[0].name),
                    surname: new AuthorSurname(authors[0].surname),
                    country: new AuthorCountry(authors[0].country),
                },
            )).toBe(undefined);
        });
    });
});
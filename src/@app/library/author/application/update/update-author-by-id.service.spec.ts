/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { UpdateAuthorByIdService } from './update-author-by-id.service';
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

describe('UpdateAuthorByIdService', () =>
{
    let service: UpdateAuthorByIdService;
    let repository: IAuthorRepository;
    let mockRepository: MockAuthorRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAuthorByIdService,
                MockAuthorRepository,
                {
                    provide : IAuthorRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpdateAuthorByIdService);
        repository = module.get(IAuthorRepository);
        mockRepository = module.get(MockAuthorRepository);
    });

    describe('main', () =>
    {
        test('UpdateAuthorByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a author and emit event', async () =>
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
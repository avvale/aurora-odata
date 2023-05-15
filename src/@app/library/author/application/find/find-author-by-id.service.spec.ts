import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { FindAuthorByIdService } from './find-author-by-id.service';
import { AuthorId } from '../../domain/value-objects';
import { IAuthorRepository } from '../../domain/author.repository';
import { MockAuthorRepository } from '../../infrastructure/mock/mock-author.repository';

describe('FindAuthorByIdService', () =>
{
    let service: FindAuthorByIdService;
    let repository: IAuthorRepository;
    let mockRepository: MockAuthorRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAuthorByIdService,
                MockAuthorRepository,
                {
                    provide : IAuthorRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindAuthorByIdService);
        repository = module.get(IAuthorRepository);
        mockRepository = module.get(MockAuthorRepository);
    });

    describe('main', () =>
    {
        test('FindAuthorByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find author by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AuthorId(authors[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
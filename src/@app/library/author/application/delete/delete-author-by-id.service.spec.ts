/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { DeleteAuthorByIdService } from './delete-author-by-id.service';
import { AuthorId } from '../../domain/value-objects';
import { IAuthorRepository } from '../../domain/author.repository';
import { MockAuthorRepository } from '../../infrastructure/mock/mock-author.repository';

describe('DeleteAuthorByIdService', () =>
{
    let service: DeleteAuthorByIdService;
    let repository: IAuthorRepository;
    let mockRepository: MockAuthorRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAuthorByIdService,
                MockAuthorRepository,
                {
                    provide : IAuthorRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteAuthorByIdService);
        repository = module.get(IAuthorRepository);
        mockRepository = module.get(MockAuthorRepository);
    });

    describe('main', () =>
    {
        test('DeleteAuthorByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete author and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AuthorId(authors[0].id),
            )).toBe(undefined);
        });
    });
});
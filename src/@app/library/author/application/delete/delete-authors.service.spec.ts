/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteAuthorsService } from './delete-authors.service';
import { IAuthorRepository } from '../../domain/author.repository';
import { MockAuthorRepository } from '../../infrastructure/mock/mock-author.repository';

describe('DeleteAuthorsService', () =>
{
    let service: DeleteAuthorsService;
    let repository: IAuthorRepository;
    let mockRepository: MockAuthorRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAuthorsService,
                MockAuthorRepository,
                {
                    provide : IAuthorRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteAuthorsService);
        repository = module.get(IAuthorRepository);
        mockRepository = module.get(MockAuthorRepository);
    });

    describe('main', () =>
    {
        test('DeleteAuthorsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete author and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAuthorQueryHandler } from './find-author.query-handler';
import { MockAuthorRepository } from '@app/library/author/infrastructure/mock/mock-author.repository';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { AuthorMapper } from '@app/library/author/domain/author.mapper';
import { FindAuthorQuery } from './find-author.query';
import { FindAuthorService } from './find-author.service';

describe('FindAuthorQueryHandler', () =>
{
    let queryHandler: FindAuthorQueryHandler;
    let service: FindAuthorService;
    let repository: MockAuthorRepository;
    let mapper: AuthorMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAuthorQueryHandler,
                {
                    provide : IAuthorRepository,
                    useClass: MockAuthorRepository,
                },
                {
                    provide : FindAuthorService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindAuthorQueryHandler>(FindAuthorQueryHandler);
        service = module.get<FindAuthorService>(FindAuthorService);
        repository = <MockAuthorRepository>module.get<IAuthorRepository>(IAuthorRepository);
        mapper = new AuthorMapper();
    });

    describe('main', () =>
    {
        test('FindAuthorQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an author founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAuthorQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
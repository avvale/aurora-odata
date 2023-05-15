import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAuthorByIdQueryHandler } from './find-author-by-id.query-handler';
import { MockAuthorRepository } from '@app/library/author/infrastructure/mock/mock-author.repository';
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { AuthorMapper } from '@app/library/author/domain/author.mapper';
import { FindAuthorByIdQuery } from './find-author-by-id.query';
import { FindAuthorByIdService } from './find-author-by-id.service';

describe('FindAuthorByIdQueryHandler', () =>
{
    let queryHandler: FindAuthorByIdQueryHandler;
    let service: FindAuthorByIdService;
    let repository: MockAuthorRepository;
    let mapper: AuthorMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAuthorByIdQueryHandler,
                {
                    provide : IAuthorRepository,
                    useClass: MockAuthorRepository,
                },
                {
                    provide : FindAuthorByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindAuthorByIdQueryHandler>(FindAuthorByIdQueryHandler);
        service = module.get<FindAuthorByIdService>(FindAuthorByIdService);
        repository = <MockAuthorRepository>module.get<IAuthorRepository>(IAuthorRepository);
        mapper = new AuthorMapper();
    });

    describe('main', () =>
    {
        test('FindAuthorByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an author founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAuthorByIdQuery(
                    authors[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
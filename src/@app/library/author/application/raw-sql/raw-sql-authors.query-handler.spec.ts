import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockAuthorRepository } from '@app/library/author/infrastructure/mock/mock-author.repository';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { AuthorMapper } from '@app/library/author/domain/author.mapper';
import { RawSQLAuthorsQueryHandler } from './raw-sql-authors.query-handler';
import { RawSQLAuthorsQuery } from './raw-sql-authors.query';
import { RawSQLAuthorsService } from './raw-sql-authors.service';

describe('RawSQLAuthorsQueryHandler', () =>
{
    let queryHandler: RawSQLAuthorsQueryHandler;
    let service: RawSQLAuthorsService;
    let repository: MockAuthorRepository;
    let mapper: AuthorMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLAuthorsQueryHandler,
                {
                    provide : IAuthorRepository,
                    useClass: MockAuthorRepository,
                },
                {
                    provide : RawSQLAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQLAuthorsQueryHandler>(RawSQLAuthorsQueryHandler);
        service = module.get<RawSQLAuthorsService>(RawSQLAuthorsService);
        repository = <MockAuthorRepository>module.get<IAuthorRepository>(IAuthorRepository);
        mapper = new AuthorMapper();
    });

    describe('main', () =>
    {
        test('RawSQLAuthorsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authors founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLAuthorsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
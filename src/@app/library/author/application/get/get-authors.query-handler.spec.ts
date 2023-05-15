import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAuthorsQueryHandler } from './get-authors.query-handler';
import { MockAuthorRepository } from '@app/library/author/infrastructure/mock/mock-author.repository';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { AuthorMapper } from '@app/library/author/domain/author.mapper';
import { GetAuthorsQuery } from './get-authors.query';
import { GetAuthorsService } from './get-authors.service';

describe('GetAuthorsQueryHandler', () =>
{
    let queryHandler: GetAuthorsQueryHandler;
    let service: GetAuthorsService;
    let repository: MockAuthorRepository;
    let mapper: AuthorMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAuthorsQueryHandler,
                {
                    provide : IAuthorRepository,
                    useClass: MockAuthorRepository,
                },
                {
                    provide : GetAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<GetAuthorsQueryHandler>(GetAuthorsQueryHandler);
        service = module.get<GetAuthorsService>(GetAuthorsService);
        repository = <MockAuthorRepository>module.get<IAuthorRepository>(IAuthorRepository);
        mapper = new AuthorMapper();
    });

    describe('main', () =>
    {
        test('GetAuthorsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authors founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAuthorsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
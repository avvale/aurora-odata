import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateAuthorsQueryHandler } from './paginate-authors.query-handler';
import { MockAuthorRepository } from '@app/library/author/infrastructure/mock/mock-author.repository';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { AuthorMapper } from '@app/library/author/domain/author.mapper';
import { PaginateAuthorsQuery } from './paginate-authors.query';
import { PaginateAuthorsService } from './paginate-authors.service';

describe('PaginateAuthorsQueryHandler', () =>
{
    let queryHandler: PaginateAuthorsQueryHandler;
    let service: PaginateAuthorsService;
    let repository: MockAuthorRepository;
    let mapper: AuthorMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAuthorsQueryHandler,
                {
                    provide : IAuthorRepository,
                    useClass: MockAuthorRepository,
                },
                {
                    provide : PaginateAuthorsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<PaginateAuthorsQueryHandler>(PaginateAuthorsQueryHandler);
        service = module.get<PaginateAuthorsService>(PaginateAuthorsService);
        repository = <MockAuthorRepository>module.get<IAuthorRepository>(IAuthorRepository);
        mapper = new AuthorMapper();
    });

    describe('main', () =>
    {
        test('PaginateAuthorsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authors paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new PaginateAuthorsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
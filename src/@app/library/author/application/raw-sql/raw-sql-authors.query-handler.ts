import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorResponse } from '../../domain/author.response';
import { AuthorMapper } from '../../domain/author.mapper';
import { RawSQLAuthorsQuery } from './raw-sql-authors.query';
import { RawSQLAuthorsService } from './raw-sql-authors.service';

@QueryHandler(RawSQLAuthorsQuery)
export class RawSQLAuthorsQueryHandler implements IQueryHandler<RawSQLAuthorsQuery>
{
    private readonly mapper: AuthorMapper = new AuthorMapper();

    constructor(
        private readonly rawSQLAuthorsService: RawSQLAuthorsService,
    ) {}

    async execute(query: RawSQLAuthorsQuery): Promise<AuthorResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAuthorsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
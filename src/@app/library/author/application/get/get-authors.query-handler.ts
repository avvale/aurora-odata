import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorResponse } from '../../domain/author.response';
import { AuthorMapper } from '../../domain/author.mapper';
import { GetAuthorsQuery } from './get-authors.query';
import { GetAuthorsService } from './get-authors.service';

@QueryHandler(GetAuthorsQuery)
export class GetAuthorsQueryHandler implements IQueryHandler<GetAuthorsQuery>
{
    private readonly mapper: AuthorMapper = new AuthorMapper();

    constructor(
        private readonly getAuthorsService: GetAuthorsService,
    ) {}

    async execute(query: GetAuthorsQuery): Promise<AuthorResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAuthorsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorResponse } from '../../domain/author.response';
import { AuthorMapper } from '../../domain/author.mapper';
import { FindAuthorQuery } from './find-author.query';
import { FindAuthorService } from './find-author.service';

@QueryHandler(FindAuthorQuery)
export class FindAuthorQueryHandler implements IQueryHandler<FindAuthorQuery>
{
    private readonly mapper: AuthorMapper = new AuthorMapper();

    constructor(
        private readonly findAuthorService: FindAuthorService,
    ) {}

    async execute(query: FindAuthorQuery): Promise<AuthorResponse>
    {
        const author = await this.findAuthorService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(author);
    }
}
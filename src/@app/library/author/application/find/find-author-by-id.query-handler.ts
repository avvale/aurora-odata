import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorResponse } from '../../domain/author.response';
import { AuthorMapper } from '../../domain/author.mapper';
import { AuthorId } from '../../domain/value-objects';
import { FindAuthorByIdQuery } from './find-author-by-id.query';
import { FindAuthorByIdService } from './find-author-by-id.service';

@QueryHandler(FindAuthorByIdQuery)
export class FindAuthorByIdQueryHandler implements IQueryHandler<FindAuthorByIdQuery>
{
    private readonly mapper: AuthorMapper = new AuthorMapper();

    constructor(
        private readonly findAuthorByIdService: FindAuthorByIdService,
    ) {}

    async execute(query: FindAuthorByIdQuery): Promise<AuthorResponse>
    {
        const author = await this.findAuthorByIdService.main(
            new AuthorId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(author);
    }
}
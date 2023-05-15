import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateAuthorsQuery } from './paginate-authors.query';
import { PaginateAuthorsService } from './paginate-authors.service';

@QueryHandler(PaginateAuthorsQuery)
export class PaginateAuthorsQueryHandler implements IQueryHandler<PaginateAuthorsQuery>
{
    constructor(
        private readonly paginateAuthorsService: PaginateAuthorsService,
    ) {}

    async execute(query: PaginateAuthorsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAuthorsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
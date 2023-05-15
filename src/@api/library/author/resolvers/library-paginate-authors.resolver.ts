import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryPaginateAuthorsHandler } from '../handlers/library-paginate-authors.handler';
import { Pagination } from '@api/graphql';

@Resolver()
export class LibraryPaginateAuthorsResolver
{
    constructor(
        private readonly handler: LibraryPaginateAuthorsHandler,
    ) {}

    @Query('libraryPaginateAuthors')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
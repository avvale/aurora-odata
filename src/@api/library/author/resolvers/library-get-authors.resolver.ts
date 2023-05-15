import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryGetAuthorsHandler } from '../handlers/library-get-authors.handler';
import { LibraryAuthor } from '@api/graphql';

@Resolver()
export class LibraryGetAuthorsResolver
{
    constructor(
        private readonly handler: LibraryGetAuthorsHandler,
    ) {}

    @Query('libraryGetAuthors')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
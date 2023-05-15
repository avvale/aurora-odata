import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryFindAuthorHandler } from '../handlers/library-find-author.handler';
import { LibraryAuthor } from '@api/graphql';

@Resolver()
export class LibraryFindAuthorResolver
{
    constructor(
        private readonly handler: LibraryFindAuthorHandler,
    ) {}

    @Query('libraryFindAuthor')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
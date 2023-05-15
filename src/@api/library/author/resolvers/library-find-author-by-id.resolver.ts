import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryFindAuthorByIdHandler } from '../handlers/library-find-author-by-id.handler';
import { LibraryAuthor } from '@api/graphql';

@Resolver()
export class LibraryFindAuthorByIdResolver
{
    constructor(
        private readonly handler: LibraryFindAuthorByIdHandler,
    ) {}

    @Query('libraryFindAuthorById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
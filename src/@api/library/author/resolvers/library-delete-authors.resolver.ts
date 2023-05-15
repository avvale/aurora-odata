import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryDeleteAuthorsHandler } from '../handlers/library-delete-authors.handler';
import { LibraryAuthor } from '@api/graphql';

@Resolver()
export class LibraryDeleteAuthorsResolver
{
    constructor(
        private readonly handler: LibraryDeleteAuthorsHandler,
    ) {}

    @Mutation('libraryDeleteAuthors')
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
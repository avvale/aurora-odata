import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryUpdateAuthorsHandler } from '../handlers/library-update-authors.handler';
import { LibraryAuthor, LibraryUpdateAuthorsInput } from '@api/graphql';

@Resolver()
export class LibraryUpdateAuthorsResolver
{
    constructor(
        private readonly handler: LibraryUpdateAuthorsHandler,
    ) {}

    @Mutation('libraryUpdateAuthors')
    async main(
        @Args('payload') payload: LibraryUpdateAuthorsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
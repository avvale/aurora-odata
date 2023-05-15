import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryUpdateAuthorByIdHandler } from '../handlers/library-update-author-by-id.handler';
import { LibraryAuthor, LibraryUpdateAuthorByIdInput } from '@api/graphql';

@Resolver()
export class LibraryUpdateAuthorByIdResolver
{
    constructor(
        private readonly handler: LibraryUpdateAuthorByIdHandler,
    ) {}

    @Mutation('libraryUpdateAuthorById')
    async main(
        @Args('payload') payload: LibraryUpdateAuthorByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryDeleteAuthorByIdHandler } from '../handlers/library-delete-author-by-id.handler';
import { LibraryAuthor } from '@api/graphql';

@Resolver()
export class LibraryDeleteAuthorByIdResolver
{
    constructor(
        private readonly handler: LibraryDeleteAuthorByIdHandler,
    ) {}

    @Mutation('libraryDeleteAuthorById')
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